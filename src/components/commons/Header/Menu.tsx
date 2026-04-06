import { MenuCloseIcon } from '@/components/icons/MenuCloseIcon';
import Image from 'next/image';
import Link from 'next/link';

interface MenuProps {
    isVisible: boolean;
    onClose: () => void;
}

export const Menu = ({ isVisible, onClose }: MenuProps) => {
    return (
        <div
            className={`${isVisible ? 'flex' : 'hidden'}
      fixed inset-0 w-full h-full bg-dracula-background/50 backdrop-blur-md md:hidden
    `}
            onClick={onClose}
        >
            <div
                className="w-full border-b border-dracula-comment/30 bg-dracula-background/95 h-96 shadow-md py-4 px-5 linux-panel"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between mb-5 items-center">
                    <Link href="/">
                        <Image src="/favicon.svg" width={48} height={48} alt="Gabriel Cix logo" />
                    </Link>
                    <button onClick={onClose} aria-label="Close navigation menu">
                        <MenuCloseIcon className="fill-white w-9 h-9" />
                    </button>
                </div>
                <div className="mb-4 terminal-font text-xs text-dracula-comment">
                    <span className="text-dracula-cyan">devcix@zsh</span>:<span className="text-dracula-pink">~</span>$
                </div>
                <nav className="flex flex-col gap-4 p-5 text-xl items-center">
                    <Link href="/" onClick={onClose} className="text-dracula-foreground transition-colors hover:text-dracula-cyan">
                        Home
                    </Link>
                    <Link href="/experiences" onClick={onClose} className="text-dracula-foreground transition-colors hover:text-dracula-cyan">
                        Experiences
                    </Link>
                    <Link href="/skills" onClick={onClose} className="text-dracula-foreground transition-colors hover:text-dracula-cyan">
                        Skills
                    </Link>
                    <Link href="/contacts" onClick={onClose} className="text-dracula-foreground transition-colors hover:text-dracula-cyan">
                        Contact
                    </Link>
                </nav>
            </div>
        </div>
    );
};