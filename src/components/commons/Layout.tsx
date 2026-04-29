import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import { JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";

interface LayoutProps {
    children: ReactNode;
}

const jetBrains_mono = JetBrains_Mono({
    subsets: ['latin'],
    weight: '500',
    display: 'swap',
    variable: '--font-jetbrains-mono',
});

const MusicPlayer = dynamic(
    () => import("./MusicPlayer").then((mod) => mod.MusicPlayer),
    {
        ssr: false,
    }
);

export const Layout = ({ children }: LayoutProps) => {
    const [shouldRenderPlayer, setShouldRenderPlayer] = useState(false);

    useEffect(() => {
        const schedulePlayer = () => setShouldRenderPlayer(true);
        const win = window as Window & {
            requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
            cancelIdleCallback?: (id: number) => void;
        };

        if (win.requestIdleCallback) {
            const callbackId = win.requestIdleCallback(schedulePlayer, { timeout: 2000 });

            return () => {
                win.cancelIdleCallback?.(callbackId);
            };
        }

        // Fallback: defer past the LCP event before injecting the YouTube API script
        const timeoutId = globalThis.setTimeout(schedulePlayer, 2000);
        return () => globalThis.clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`${jetBrains_mono.variable} ${jetBrains_mono.className}`}>
            <Header />
            <main>{children}</main>
            {shouldRenderPlayer ? <MusicPlayer /> : null}
        </div>
    );
}