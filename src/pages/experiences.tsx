import Head from 'next/head';
import { motion } from 'framer-motion';
import { Terminal, PromptLine } from '@/components/Home/Terminal';

type ExperienceType = 'work' | 'education';

interface ExperienceItem {
    title: string;
    company: string;
    period: string;
    description: string;
    highlights: string[];
    type: ExperienceType;
}

const experiences: ExperienceItem[] = [
    {
        title: 'IT Technician',
        company: 'Senac Catanduva',
        period: 'Feb 2022 - Dec 2023',
        description: 'Technical training focused on computer maintenance, support routines, and foundational systems administration.',
        highlights: [
            'Completed the full technical program in Computer Science.',
            'Built a practical base in hardware, software, and user support.',
            'Strengthened problem-solving through lab work and service simulations.',
        ],
        type: 'education',
    },
    {
        title: 'Freelance WordPress Developer',
        company: 'Polosoft',
        period: 'Sep 2022 - Jan 2025',
        description: 'Freelance work delivering WordPress sites, maintenance, and small feature adjustments for client-facing pages.',
        highlights: [
            'Delivered WordPress customizations and site updates independently.',
            'Supported content changes, bug fixes, and performance improvements.',
            'Worked across multiple client requests while keeping delivery predictable.',
        ],
        type: 'work',
    },
    {
        title: 'Help Desk Technician',
        company: 'Law office',
        period: 'Jun 2023 - Sep 2025',
        description: 'Internal support role focused on day-to-day troubleshooting, workstation maintenance, and user assistance.',
        highlights: [
            'Handled support tickets and guided users through technical issues.',
            'Maintained workstations, peripherals, and office productivity tools.',
            'Kept support responses organized in a fast-moving environment.',
        ],
        type: 'work',
    },
    {
        title: 'Systems Analysis and Development',
        company: 'Descomplica University',
        period: 'May 2024 - Expected Nov 2026',
        description: 'Current degree focused on software development, analysis, and practical systems design.',
        highlights: [
            'Started the degree in May 2024.',
            'Expected graduation two and a half years later, around November 2026.',
            'Keeping the academic track aligned with daily technical work.',
        ],
        type: 'education',
    },
    {
        title: 'Support Analyst',
        company: 'Local holding company',
        period: 'Feb 2026 - Present',
        description: 'Current role centered on technical support, diagnosis, and operational stability across internal systems.',
        highlights: [
            'Owns support workflows for internal users and devices.',
            'Analyses incidents and resolves issues with a practical approach.',
            'Coordinates everyday support needs in the current workplace.',
        ],
        type: 'work',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const Experiences = () => {
    return (
        <>
            <Head>
                <title>Experiences | devcix</title>
                <meta name="description" content="Professional and academic experience timeline for devcix" />
            </Head>

            <div className="min-h-screen linux-shell-bg py-12 md:py-24">
                <div className="max-w-6xl mx-auto px-6 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-14 md:mb-16"
                    >
                        <p className="linux-command text-sm mb-3">cat ~/experiences.log</p>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-dracula-foreground">Experiences</h1>
                        <p className="text-xl text-dracula-comment">
                            <span className="text-dracula-cyan">❯</span> Education and work history, arranged like a system log.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="mb-12"
                    >
                        <Terminal title="devcix@zsh:~/experiences">
                            <div className="space-y-2">
                                <PromptLine command="whoami" delay={0.15} />
                                <div className="ml-4 text-dracula-comment">devcix</div>
                                <PromptLine command="uptime" delay={0.3} />
                                <div className="ml-4 text-dracula-comment">Working in support, web, and development since 2022.</div>
                                <PromptLine command="cat career.log" delay={0.45} active />
                            </div>
                        </Terminal>
                    </motion.div>

                    <div className="relative pl-5 md:pl-0">
                        <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dracula-cyan via-dracula-purple to-dracula-pink md:-translate-x-1/2" />

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.12 }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.12 } },
                            }}
                            className="space-y-8"
                        >
                            {experiences.map((experience, index) => (
                                <motion.article
                                    key={`${experience.company}-${experience.title}`}
                                    variants={cardVariants}
                                    className={`relative md:flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className="absolute left-0 top-6 md:left-1/2 w-3 h-3 rounded-full bg-dracula-cyan md:-translate-x-1.5 border-4 border-dracula-background" />
                                    <div className="hidden md:block md:w-1/2" />

                                    <div className="ml-8 md:ml-0 md:w-1/2 p-5 linux-panel border border-dracula-comment/30 rounded-2xl hover:border-dracula-cyan/40 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{experience.type === 'work' ? '💼' : '🎓'}</span>
                                            <div>
                                                <h2 className="text-xl font-bold text-dracula-foreground">{experience.title}</h2>
                                                <p className="text-dracula-comment text-sm">{experience.company}</p>
                                            </div>
                                        </div>

                                        <p className="text-dracula-comment text-sm mb-4">{experience.period}</p>
                                        <p className="text-dracula-foreground/85 mb-5 leading-relaxed">{experience.description}</p>

                                        <ul className="space-y-2">
                                            {experience.highlights.map((highlight) => (
                                                <li key={highlight} className="flex items-start gap-3 text-dracula-comment text-sm leading-relaxed">
                                                    <span className="text-dracula-pink mt-1">→</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.45 }}
                        className="mt-12 p-4 linux-panel border border-dracula-comment/30 rounded-xl text-center"
                    >
                        <p className="text-dracula-comment flex items-center justify-center gap-2">
                            <span className="text-dracula-cyan">❯</span>
                            Support, analysis, and development keep shaping the next commit.
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Experiences;