import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Accept prompt, max_tokens, temperature from client
    const { prompt, max_tokens, temperature } = req.body;
    if (!process.env.MISTRAL_API_KEY) {
      return res.status(500).json({ error: 'MISTRAL_API_KEY is not set in the environment.' });
    }
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }
    const body = {
      model: 'codestral-latest',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: max_tokens ?? 1000,
      temperature: temperature ?? 0.7,
    };

    const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    // Forward Mistral's status and error if any
    if (!mistralRes.ok) {
      const err = await mistralRes.text();
      return res.status(mistralRes.status).json({ error: err });
    }

    const data = await mistralRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error instanceof Error ? error.message : error });
  }
}
