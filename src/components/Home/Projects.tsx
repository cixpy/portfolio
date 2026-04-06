import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/types/Home';

interface ProjectsProps {
    projects: Project[];
}

const ProjectItem = memo(({ project, index, isExpanded, onToggle }: { project: Project; index: number; isExpanded: boolean; onToggle: (slug: string) => void; }) => {
    const { external, repository, slug, name, image, description } = project;

    return (
        <motion.li
            variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "easeOut", duration: 0.3 }
                }
            }}
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
            className="group relative"
        >
            <article className="rounded-2xl overflow-hidden bg-dracula-current/70 shadow-lg transition-all duration-200 border border-dracula-comment/25 group-hover:border-dracula-cyan/40">
                <button
                    type="button"
                    onClick={() => onToggle(slug)}
                    aria-expanded={isExpanded}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                >
                    <div>
                        <p className="linux-command text-xs mb-2">project {index + 1}</p>
                        <h3 className="text-2xl text-dracula-foreground font-semibold">{name}</h3>
                        <p className="mt-2 text-dracula-comment text-sm">Click to expand details and preview.</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-dracula-comment/30 px-3 py-1 text-xs text-dracula-cyan">
                        {isExpanded ? 'collapse' : 'expand'}
                    </span>
                </button>

                <AnimatePresence initial={false}>
                    {isExpanded ? (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-dracula-comment/20"
                        >
                            <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
                                <div className="space-y-4">
                                    <p className="text-dracula-foreground/80 leading-relaxed">
                                        {description}
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            href={external}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-dracula-cyan px-4 py-2 text-sm font-medium text-dracula-background transition-opacity hover:opacity-90"
                                        >
                                            Open live site
                                        </Link>
                                        <Link
                                            href={repository}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full border border-dracula-comment/30 px-4 py-2 text-sm font-medium text-dracula-foreground transition-colors hover:border-dracula-pink hover:text-dracula-pink"
                                        >
                                            Source code
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-xl border border-dracula-comment/30 bg-transparent aspect-video">
                                    <Image
                                        src={image.url}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        unoptimized
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </article>
        </motion.li>
    );
});

ProjectItem.displayName = 'ProjectItem';

export const Projects = ({ projects }: ProjectsProps) => {
    const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

    return (
        <section className="py-10 px-4 md:px-8 min-h-screen">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
                className="max-w-7xl mx-auto"
            >
                <motion.h2
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3 }
                        }
                    }}
                    className="text-4xl sm:text-5xl text-dracula-foreground font-light mb-12 text-center"
                >
                    Selected{' '}
                    <span className="font-bold text-dracula-pink bg-gradient-to-r from-dracula-pink to-dracula-cyan bg-clip-text text-transparent">
                        projects
                    </span>
                </motion.h2>

                <motion.ul className="grid grid-cols-1 gap-6">
                    {projects.map((project, index) => (
                        <ProjectItem
                            key={project.slug}
                            project={project}
                            index={index}
                            isExpanded={expandedSlug === project.slug}
                            onToggle={(slug) => setExpandedSlug((current) => current === slug ? null : slug)}
                        />
                    ))}
                </motion.ul>
            </motion.div>
        </section>
    );
};

export default memo(Projects);