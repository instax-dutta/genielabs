import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const mistralRes = await fetch('https://codestral.mistral.ai/v1/fim/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await mistralRes.json();
    res.status(mistralRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error });
  }
}
