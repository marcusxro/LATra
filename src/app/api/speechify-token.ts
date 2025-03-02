// pages/api/speechify-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Your Speechify API logic goes here
    const accessToken = "9XQ0fTnV8w2V4RKyoq1bKCyUh3jxBse9pCb6v-cdP7Q=";

    if (!accessToken) {
        return res.status(500).json({ error: "Missing Speechify access token" });
    }

    return res.status(200).json({ accessToken });
}
