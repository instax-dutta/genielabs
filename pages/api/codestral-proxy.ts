import type { NextApiRequest, NextApiResponse } from 'next';
import { LRUCache } from 'lru-cache';

// Initialize cache: max 100 items, TTL 1 hour
const cache = new LRUCache<string, any>({
  max: 100,
  ttl: 1000 * 60 * 60,
});

// Helper to get keys from environment variable
const getKeys = (envVar: string | undefined): string[] => {
  if (!envVar) return [];
  return envVar.split(',').map(key => key.trim()).filter(key => key.length > 0);
};

// Simple random rotation to distribute load across keys
const getRandomKey = (keys: string[]): string | null => {
  if (keys.length === 0) return null;
  return keys[Math.floor(Math.random() * keys.length)];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { prompt, max_tokens, temperature } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Performance: Check cache first
    const cacheKey = JSON.stringify({ prompt, max_tokens, temperature });
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return res.status(200).json(cachedResponse);
    }

    const ollamaKeys = getKeys(process.env.OLLAMA_API_KEYS);
    const mistralKeys = getKeys(process.env.MISTRAL_API_KEYS || process.env.MISTRAL_API_KEY);

    // Default to Ollama Cloud API host
    const ollamaHost = process.env.OLLAMA_HOST || 'https://ollama.com';

    // 1. Try Ollama Cloud (Primary)
    if (ollamaKeys.length > 0) {
      try {
        const key = getRandomKey(ollamaKeys);
        const body = {
          model: 'glm-4.6:cloud',
          messages: [{ role: 'user', content: prompt }],
          options: {
            num_predict: max_tokens ?? 1000,
            temperature: temperature ?? 0.7,
          },
          stream: false
        };

        const ollamaRes = await fetch(`${ollamaHost}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
          },
          body: JSON.stringify(body),
        });

        if (ollamaRes.ok) {
          const data = await ollamaRes.json();
          const finalResponse = {
            choices: [{
              message: {
                content: data.message?.content || data.response || ""
              }
            }]
          };
          // Store in cache
          cache.set(cacheKey, finalResponse);
          return res.status(200).json(finalResponse);
        }

        const errorText = await ollamaRes.text();
        console.warn(`Ollama request failed (${ollamaRes.status}): ${errorText}. Falling back to Mistral...`);
      } catch (e) {
        console.error('Ollama error:', e);
      }
    }

    // 2. Fallback to Mistral
    if (mistralKeys.length > 0) {
      try {
        const key = getRandomKey(mistralKeys);
        const body = {
          model: 'codestral-latest',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: max_tokens ?? 1000,
          temperature: temperature ?? 0.7,
        };

        const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${key}`,
          },
          body: JSON.stringify(body),
        });

        if (mistralRes.ok) {
          const data = await mistralRes.json();
          // Store in cache
          cache.set(cacheKey, data);
          return res.status(200).json(data);
        } else {
          const err = await mistralRes.text();
          console.error(`Mistral fallback failed (${mistralRes.status}): ${err}`);
          return res.status(mistralRes.status).json({ error: 'Mistral fallback failed', details: err });
        }
      } catch (e) {
        console.error('Mistral error:', e);
        return res.status(500).json({ error: 'Mistral fallback failed', details: e instanceof Error ? e.message : String(e) });
      }
    }

    return res.status(500).json({ error: 'No AI providers available or all failed.' });

  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error instanceof Error ? error.message : error });
  }
}
