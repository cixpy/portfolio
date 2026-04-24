import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TerminalProps {
    title?: string;
    children: ReactNode;
}

export const Terminal = ({ title = 'devcix@tech:~', children }: TerminalProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-3xl rounded-md border border-dracula-comment/30 bg-dracula-selection/10 terminal-font shadow-[0_18px_55px_rgba(0,0,0,0.25)]"
        >
            <div className="px-4 py-3 border-b border-dracula-comment/20 text-xs text-dracula-comment">
                {title}
            </div>
            <div className="terminal-body px-4 py-4">
                {children}
            </div>
        </motion.div>
    );
};

/* Prompt line helper */
interface PromptLineProps {
    command: string;
    delay?: number;
    active?: boolean;
}

export const PromptLine = ({ command, delay = 0, active = false }: PromptLineProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="flex items-center gap-2 mb-1"
        >
            <span className="text-dracula-cyan">➜</span>
            <span className="text-dracula-pink">~</span>
            <span className="text-dracula-foreground">{command}</span>
            {active ? <span className="w-1.5 h-4 bg-dracula-cyan animate-blink inline-block ml-1"></span> : null}
        </motion.div>
    );
};

/* Output line helper */
interface OutputLineProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export const OutputLine = ({ children, delay = 0, className = '' }: OutputLineProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
            className={`text-dracula-comment pl-5 mb-1 ${className}`}
        >
            {children}
        </motion.div>
    );
};
