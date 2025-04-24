import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Prepare the request body for the chat/completions endpoint
    const { prompt, max_tokens, temperature } = req.body;
    const chatBody = {
      model: 'codestral-latest',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens,
      temperature
    };

    const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`,
      },
      body: JSON.stringify(chatBody),
    });

    const data = await mistralRes.json();
    res.status(mistralRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error });
  }
}
