
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const accessToken ="token";

    if (!accessToken) {
        return res.status(500).json({ error: "Missing Speechify access token" });
    }

    return res.status(200).json({ accessToken });
}
