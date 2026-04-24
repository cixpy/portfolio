import Image from 'next/image';
import Link from 'next/link';
import { JetBrains_Mono } from 'next/font/google';
import { Menu } from './Menu';
import { useCallback, useState } from 'react';
import { MenuIcon } from '@/components/icons/MenuIcon';

const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: '500',
});

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = useCallback(() => {
        setIsMenuOpen(true);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header
            className={`${jetBrainsMono.className} sticky top-0 z-30 border-b border-dracula-comment/20 bg-dracula-background/90 text-sm backdrop-blur-sm md:bg-dracula-background/80 md:backdrop-blur-xl`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/favicon.svg" width={44} height={44} alt="Gabriel Cix logo" className="transition-transform duration-300 hover:scale-110" />
                    <div className="hidden sm:block">
                        <p className="text-xs uppercase tracking-[0.35em] text-dracula-cyan">devcix@tech</p>
                        <p className="text-xs text-dracula-comment">~/portfolio</p>
                    </div>
                </Link>
                <button className="rounded-full border border-dracula-comment/30 p-2 md:hidden" onClick={openMenu} aria-label="Open navigation menu">
                    <MenuIcon className="h-8 w-8 fill-white" />
                </button>
                <nav className="hidden items-center gap-8 text-sm md:flex">
                    <Link href="/" className="text-dracula-foreground transition-colors hover:text-dracula-cyan">Home</Link>
                    <Link href="/experiences" className="text-dracula-foreground transition-colors hover:text-dracula-cyan">Experiences</Link>
                    <Link href="/skills" className="text-dracula-foreground transition-colors hover:text-dracula-cyan">Skills</Link>
                    <Link href="/contacts" className="text-dracula-foreground transition-colors hover:text-dracula-cyan">Contact</Link>
                </nav>
            </div>
            <Menu isVisible={isMenuOpen} onClose={closeMenu} />
        </header>
    );
};