"use client";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";

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

function Nav() {
    const pathname = usePathname();
    if (pathname === "/") return null;

    return (
        <nav className="bg-[#8DA97711] py-2">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="/" className="text-xs text-gray-600 hover:text-gray-900">
                    ← Home
                </a>
            </div>
        </nav>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <html lang="en" className={`${openSans.variable}`}>
        <html lang="en" className={inter.className}>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </head>

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
