import { motion } from 'framer-motion';
import Link from 'next/link';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const socialLinks = [
        { name: 'github', url: 'https://github.com/cixpy' },
        { name: 'linkedin', url: 'https://linkedin.com/in/cixayah' },
        { name: 'twitch', url: 'https://twitch.tv/cixjs' },
        { name: 'youtube', url: 'https://youtube.com/@cix.mp3' },
        { name: 'email', url: 'mailto:contato@devcix.com' },
    ];

    return (
        <footer className="border-t border-dracula-comment/25 mt-16 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="space-y-8"
                >
                    {/* Terminal-style section */}
                    <motion.div
                        variants={itemVariants}
                        className="linux-panel p-6"
                    >
                        <p className="text-dracula-comment mb-3">devcix@tech:~</p>
                        <div className="space-y-1 text-sm">
                            <div className="flex gap-2">
                                <span className="text-dracula-cyan">❯</span>
                                <span className="text-dracula-foreground">cat</span>
                                <span className="text-dracula-cyan">README.md</span>
                            </div>
                            <div className="ml-6 text-dracula-comment text-xs">
                                <p>Full Stack Developer | Linux-inspired interface</p>
                                <p>TypeScript, Node.js, and Python</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Links Grid */}
                    <motion.div variants={itemVariants}>
                        <h3 className="linux-command text-sm mb-4">
                            cat links.txt
                        </h3>
                        <div className="linux-panel p-4 space-y-2 text-sm">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ x: 2 }}
                                    className="block text-dracula-comment hover:text-dracula-cyan terminal-font transition-colors"
                                >
                                    <span className="text-dracula-cyan mr-2">-</span>
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className="h-px bg-gradient-to-r from-transparent via-dracula-comment/40 to-transparent"
                    />

                    {/* Bottom info */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-2 terminal-font text-sm"
                    >
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <div className="text-dracula-comment">
                                <span className="text-dracula-cyan">❯</span> © {currentYear} Gabriel Cix
                            </div>
                            <div className="flex gap-4 text-dracula-comment text-xs">
                                <Link
                                    href="/"
                                    className="hover:text-dracula-cyan transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/skills"
                                    className="hover:text-dracula-cyan transition-colors"
                                >
                                    Skills
                                </Link>
                                <Link
                                    href="/experiences"
                                    className="hover:text-dracula-cyan transition-colors"
                                >
                                    Experiences
                                </Link>
                                <Link
                                    href="/contacts"
                                    className="hover:text-dracula-cyan transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div className="text-dracula-comment text-xs">
                            <span>Built with TypeScript</span>
                            <span className="mx-2">•</span>
                            <span>Node.js & Python</span>
                            <span className="mx-2">•</span>
                            <span>Dracula Terminal Theme</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};
