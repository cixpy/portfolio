import Head from 'next/head';
import { motion } from 'framer-motion';
import { Terminal, PromptLine } from '@/components/Home/Terminal';
import { useState } from 'react';

const Skills = () => {
    const [expandedSkill, setExpandedSkill] = useState<string>('TypeScript');

    const skillsData = [
        {
            name: 'TypeScript',
            command: 'typescript.md',
            description: 'Typed frontend and backend development with safer refactors.',
        },
        {
            name: 'Node.js',
            command: 'nodejs.md',
            description: 'Server-side work, APIs, automation, and support tooling.',
        },
        {
            name: 'Python',
            command: 'python.md',
            description: 'Scripting, quick utilities, and practical problem solving.',
        },
    ];

    const expandedSkillCommand = skillsData.find((skill) => skill.name === expandedSkill)?.command ?? 'typescript.md';

    return (
        <>
            <Head>
                <title>Skills | devcix</title>
                <meta name="description" content="Primary technologies used by devcix" />
            </Head>

            <div className="min-h-screen linux-shell-bg py-12 md:py-24">
                <div className="max-w-6xl mx-auto px-6 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <p className="linux-command text-sm mb-3">tree ~/skills</p>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-dracula-foreground">Skills & Tools</h1>
                        <p className="text-xl text-dracula-comment">
                            <span className="text-dracula-cyan">❯</span> The stack kept in active use.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-12"
                    >
                        <Terminal title="devcix@zsh:~/skills">
                            <div className="space-y-2">
                                <PromptLine command="ls -la skills/" delay={0.2} />
                                <div className="ml-4 text-dracula-comment text-sm space-y-1">
                                    <div>total 24</div>
                                    <div>drwxr-xr-x 3 devcix devcix 4096 Apr 6 2026 .</div>
                                    <div>drwxr-xr-x 3 devcix devcix 4096 Apr 6 2026 ..</div>
                                    {skillsData.map((skill, idx) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                            className="text-dracula-cyan"
                                        >
                                            -rw-r--r-- 1 devcix devcix 512 Apr 6 {skill.command}
                                        </motion.div>
                                    ))}
                                </div>
                                <PromptLine command={`cat ${expandedSkillCommand}`} delay={0.8} active />
                            </div>
                        </Terminal>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {skillsData.map((skillGroup) => (
                            <motion.div
                                key={skillGroup.name}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                onClick={() => setExpandedSkill(skillGroup.name)}
                                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 terminal-font bg-dracula-selection/10
                                    ${expandedSkill === skillGroup.name
                                        ? 'border-dracula-cyan/50 shadow-lg shadow-dracula-cyan/10'
                                        : 'border-dracula-comment/30 hover:border-dracula-pink/30'
                                    }`}
                            >
                                <h3 className="text-lg font-bold text-dracula-foreground mb-2">{skillGroup.name}</h3>
                                <p className="text-sm text-dracula-comment leading-relaxed">{skillGroup.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 p-4 linux-panel border-dracula-comment/40 rounded-lg"
                    >
                        <p className="text-dracula-comment flex items-center gap-2">
                            <span className="text-dracula-cyan">❯</span>
                            Focused on practical delivery, support work, and repeatable improvement.
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Skills;
