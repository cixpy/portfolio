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
            const callbackId = win.requestIdleCallback(schedulePlayer, { timeout: 1500 });

            return () => {
                win.cancelIdleCallback?.(callbackId);
            };
        }

        const timeoutId = globalThis.setTimeout(schedulePlayer, 600);
        return () => globalThis.clearTimeout(timeoutId);
    }, []);

    return (
        <div className={jetBrains_mono.className}>
            <Header />
            <main>{children}</main>
            {shouldRenderPlayer ? <MusicPlayer /> : null}
        </div>
    );
}