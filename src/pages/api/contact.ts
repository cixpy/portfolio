import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

type ContactResponse = {
    message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 3000;

/** Strip HTML tags to prevent injection in the email body */
function sanitize(input: string): string {
    return input.replace(/<[^>]*>/g, '').trim();
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ContactResponse>) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');

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

    if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
        return res.status(400).json({ message: 'One or more fields exceed the maximum length' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ message: 'Missing Resend API key' });
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    try {
        const { error } = await resend.emails.send({
            from: 'devcix <onboarding@resend.dev>',
            to: 'gabrielviniciodacosta@gmail.com',
            subject: `Portfolio contact from ${safeName}`,
            replyTo: safeEmail,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head><meta charset="UTF-8" /></head>
                <body style="font-family:monospace;background:#282a36;color:#f8f8f2;padding:24px;border-radius:8px">
                    <h2 style="color:#8be9fd;margin-bottom:16px">📬 New contact from the portfolio</h2>
                    <table style="width:100%;border-collapse:collapse">
                        <tr>
                            <td style="padding:8px 0;color:#6272a4;width:80px">Name</td>
                            <td style="padding:8px 0;color:#f8f8f2">${safeName}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;color:#6272a4">Email</td>
                            <td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#8be9fd">${safeEmail}</a></td>
                        </tr>
                    </table>
                    <hr style="border-color:#44475a;margin:16px 0" />
                    <p style="color:#6272a4;margin-bottom:8px">Message</p>
                    <p style="color:#f8f8f2;white-space:pre-wrap;line-height:1.6">${safeMessage.replace(/\n/g, '<br />')}</p>
                </body>
                </html>
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