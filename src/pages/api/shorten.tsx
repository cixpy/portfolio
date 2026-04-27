import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import shortid from 'shortid';

// Model
const urlSchema = new mongoose.Schema({
    fullUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, default: () => shortid.generate().substring(0, 5) },
    createdAt: { type: Date, default: Date.now, expires: 7200 },
});
const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

// DB Connection
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI!);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const allowedOrigins = ['https://cixpy.github.io', 'http://127.0.0.1:5500'];
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    await connectDB();

    if (req.method === 'POST') {
        const { fullUrl } = req.body;
        if (!fullUrl) {
            return res.status(400).json({ error: 'URL completa é necessária.' });
        }
        try {
            const newUrl = new Url({ fullUrl });
            await newUrl.save();
            res.status(200).json({ shortUrl: newUrl.shortUrl });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao encurtar o link.' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
