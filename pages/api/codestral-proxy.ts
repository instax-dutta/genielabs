import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Accept prompt, max_tokens, temperature from client
    const { prompt, max_tokens, temperature } = req.body;
    const body = {
      model: 'codestral-latest',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: max_tokens ?? 1000,
      temperature: temperature ?? 0.7,
    };

    // Use MISTRAL_API_KEY for server-side security
    const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await mistralRes.json();
    res.status(mistralRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error });
  }
}
