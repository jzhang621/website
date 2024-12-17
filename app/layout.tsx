import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// app/layout.tsx
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});



export const metadata: Metadata = {
    title: "Jimmy Zhang",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={openSans.variable}>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </head>

            <body className={`bg-white  antialiased`}>
                <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
                <Analytics />
            </body>
        </html>
    );
}
