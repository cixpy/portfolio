import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { AboutMe as TAboutMe } from '@/types/Home';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
});

interface AboutMeProps {
    aboutMe: TAboutMe;
}

export const AboutMe = ({ aboutMe }: AboutMeProps) => {
    const { title, description, contact, pfp, techs } = aboutMe;

    return (
        <main
            className="min-h-[85vh] flex flex-wrap-reverse justify-center items-center gap-10 md:gap-20 py-12 px-4"
        >
            <div className="flex-1 flex flex-col items-center xl:items-start gap-6 min-w-[300px] max-w-2xl animate-fade-in-up">
                <p className="linux-command text-sm">cat ~/profile.md</p>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light text-white">
                    {title.default}{' '}
                    <span className="font-bold text-dracula-pink italic inline-block" aria-label={title.bold}>
                        {title.bold.split('').map((char, index) => (
                            <span
                                key={index}
                                className="inline-block"
                                style={{
                                    animation: 'letter-rise 0.45s ease-out both',
                                    animationDelay: `${index * 0.04}s`,
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                </h1>

                <div className="space-y-6 text-center xl:text-left animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                    <p className={`${roboto.className} text-xl text-dracula-foreground/80 leading-relaxed`}>
                        {description}
                    </p>

                    <p className="terminal-font text-sm text-dracula-cyan/90">
                        available for freelance
                    </p>

                    <Link
                        href={contact.link}
                        className="inline-block px-8 py-4 border border-dracula-comment/40 text-dracula-foreground text-lg rounded-lg terminal-font
                            transition-all duration-300 hover:border-dracula-cyan/40 hover:text-dracula-cyan"
                    >
                        {contact.label}
                    </Link>
                </div>

                <ul
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-3xl mt-2 terminal-font text-dracula-comment text-sm"
                >
                    {techs.map(({ tech, bgcolor, color }, index) => (
                        <li
                            key={tech + index}
                            className="relative group cursor-pointer border border-dracula-comment/30 rounded-lg px-4 py-3 hover:border-dracula-cyan/40"
                            style={{
                                animation: 'fade-in-up 0.45s ease-out both',
                                animationDelay: `${0.45 + index * 0.06}s`,
                            }}
                        >
                            <span>{tech}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative flex-shrink-0 animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden
                    shadow-2xl transition-transform duration-300 hover:scale-105">
                    <Image
                        src={pfp.image.url}
                        alt={pfp.image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 280px, 400px"
                        priority
                    />
                </div>

                <div
                    className="absolute -bottom-4 right-0 bg-dracula-pink text-white p-4 rounded-xl terminal-font
                        shadow-lg transform hover:scale-105 transition-transform duration-300"
                    style={{
                        animation: 'fade-in-up 0.45s ease-out both',
                        animationDelay: '0.6s',
                    }}
                >
                    <p className="font-bold text-2xl mb-1">{pfp.experience.bold}</p>
                    <p className="text-sm opacity-90">{pfp.experience.default}</p>
                </div>
            </div>
        </main>
    );
};