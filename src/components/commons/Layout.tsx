import { ReactNode } from "react";
import { Header } from "./Header";
import { JetBrains_Mono } from "next/font/google";

interface LayoutProps {
    children: ReactNode;
}

const jetBrains_mono = JetBrains_Mono({
    subsets: ['latin'],
    weight: '500',
});

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={jetBrains_mono.className}>
            <Header />
            <main>{children}</main>
        </div>
    );
}