import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

type ContactResponse = {
    message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ContactResponse>) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, message } = req.body as {
        name?: string;
        email?: string;
        message?: string;
    };

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ message: 'Missing Resend API key' });
    }

    try {
        const { error } = await resend.emails.send({
            from: 'devcix <onboarding@resend.dev>',
            to: 'contato@devcix.com',
            subject: `Portfolio contact from ${name}`,
            replyTo: email,
            html: `
                <h2>New contact form submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br />')}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            const errorMessage = typeof error === 'object' && error && 'message' in error
                ? String((error as { message?: string }).message)
                : 'Failed to send message';

            return res.status(500).json({ message: errorMessage });
        }

        return res.status(200).json({ message: 'Message sent' });
    } catch {
        return res.status(500).json({ message: 'Failed to send message' });
    }
}