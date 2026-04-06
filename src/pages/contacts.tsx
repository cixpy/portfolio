import { CopyButton } from "@/components/commons/CopyButton";
import { PromptLine, Terminal } from "@/components/Home/Terminal";
import { FormEvent, useState } from "react";
import Head from "next/head";

const Contacts = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [feedback, setFeedback] = useState('');

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.message || 'Request failed');
            }

            setStatus('success');
            setFeedback(payload.message || 'message sent successfully.');
            setName('');
            setEmail('');
            setMessage('');
        } catch {
            setStatus('error');
            setFeedback('failed to send. check Resend API key, verified sender, and dashboard logs.');
        }
    };

    return (
        <>
            <Head>
                <title>Contact | devcix</title>
                <meta name="description" content="Contact links for devcix" />
            </Head>
            <div className="min-h-screen linux-shell-bg py-12 md:py-24">
                <div className="max-w-6xl mx-auto px-6 md:px-8">
                    <div className="mb-16">
                        <p className="linux-command text-sm mb-3">cat ~/contacts.md</p>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-dracula-foreground">Contact</h1>
                        <p className="text-xl text-dracula-comment"><span className="text-dracula-cyan">❯</span> Reach me through the channels below.</p>
                    </div>

                    <div className="mb-10">
                        <Terminal title="cix@tech:~/contacts">
                            <div className="space-y-2">
                                <PromptLine command="ls -la contacts/" delay={0.1} />
                                <div className="ml-4 text-dracula-comment text-sm">email.md linkedin.md github.md instagram.md</div>
                                <PromptLine command="cat email.md" delay={0.25} active />
                            </div>
                        </Terminal>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="linux-panel p-5 rounded-2xl border border-dracula-comment/30">
                            <span className="font-bold terminal-font text-dracula-foreground">Email</span>
                            <div className="flex gap-1 md:gap-3 items-center mt-3">
                                <a href="mailto:contato@devcix.com" className="text-sm md:text-lg text-dracula-foreground underline truncate" target="_blank">
                                    contato@devcix.com
                                </a>
                                <CopyButton textToCopy="contato@devcix.com" />
                            </div>
                        </li>
                        <li className="linux-panel p-5 rounded-2xl border border-dracula-comment/30">
                            <span className="font-bold terminal-font text-dracula-foreground">LinkedIn</span>
                            <div className="flex gap-1 md:gap-3 items-center mt-3">
                                <a href="https://linkedin.com/in/cixayah" target="_blank" className="text-sm md:text-lg text-dracula-foreground underline truncate">
                                    https://linkedin.com/in/cixayah
                                </a>
                            </div>
                        </li>
                        <li className="linux-panel p-5 rounded-2xl border border-dracula-comment/30">
                            <span className="font-bold terminal-font text-dracula-foreground">GitHub</span>
                            <div className="flex gap-1 md:gap-3 items-center mt-3">
                                <a href="https://github.com/cixpy" target="_blank" className="text-sm md:text-lg text-dracula-foreground underline truncate">
                                    https://github.com/cixpy
                                </a>
                            </div>
                        </li>
                        <li className="linux-panel p-5 rounded-2xl border border-dracula-comment/30">
                            <span className="font-bold terminal-font text-dracula-foreground">Instagram</span>
                            <div className="flex gap-1 md:gap-3 items-center mt-3">
                                <a href="https://instagram.com/devcix" target="_blank" className="text-sm md:text-lg text-dracula-foreground underline truncate">
                                    https://instagram.com/devcix
                                </a>
                            </div>
                        </li>
                    </ul>

                    <form onSubmit={onSubmit} className="mt-10 linux-panel p-6 rounded-2xl border border-dracula-comment/30 space-y-4">
                        <p className="linux-command text-sm">cat send-message.sh</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="text-sm text-dracula-comment terminal-font">
                                Name
                                <input
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="mt-2 w-full rounded-lg border border-dracula-comment/40 bg-transparent px-3 py-2 text-dracula-foreground outline-none focus:border-dracula-cyan/50"
                                />
                            </label>

                            <label className="text-sm text-dracula-comment terminal-font">
                                Email
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="mt-2 w-full rounded-lg border border-dracula-comment/40 bg-transparent px-3 py-2 text-dracula-foreground outline-none focus:border-dracula-cyan/50"
                                />
                            </label>
                        </div>

                        <label className="text-sm text-dracula-comment terminal-font block">
                            Message
                            <textarea
                                required
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                rows={5}
                                className="mt-2 w-full rounded-lg border border-dracula-comment/40 bg-transparent px-3 py-2 text-dracula-foreground outline-none focus:border-dracula-cyan/50"
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="rounded-lg border border-dracula-comment/40 px-4 py-2 terminal-font text-dracula-foreground hover:border-dracula-cyan/50 hover:text-dracula-cyan disabled:opacity-60"
                        >
                            {status === 'sending' ? 'sending...' : 'send'}
                        </button>

                        {status === 'success' ? <p className="text-dracula-cyan terminal-font text-sm">{feedback}</p> : null}
                        {status === 'error' ? <p className="text-dracula-red terminal-font text-sm">{feedback}</p> : null}
                    </form>
                </div>
            </div>
        </>
    )
}
export default Contacts;