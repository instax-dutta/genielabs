import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Accept prompt, max_tokens, temperature, suffix from client
    const { prompt, max_tokens, temperature, suffix } = req.body;
    const fimBody = {
      model: 'codestral-latest',
      prompt: prompt,
      suffix: suffix ?? '',
      max_tokens: max_tokens ?? 1000,
      temperature: temperature ?? 0.7,
    };

    const mistralRes = await fetch('https://api.mistral.ai/v1/fim/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`,
      },
      body: JSON.stringify(fimBody),
    });

    const data = await mistralRes.json();
    res.status(mistralRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error });
  }
}
