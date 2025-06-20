import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./components/Nav";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

// app/layout.tsx
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
});

export const metadata: Metadata = {
    title: {
        default: "Jimmy Meets World",
        template: "%s | Jimmy Meets World",
    },
    description: "Personal blog and portfolio of Jimmy Zhang",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
        other: {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon-32x32.png",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.className}>
            <body className={`bg-white antialiased`}>
                <Nav />
                <div className="mt-4 w-full md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
                <Analytics />
            </body>
        </html>
    );
}
