import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./components/Nav";
import { FootnoteProvider } from "../components/Footnote";
import { ThemeProvider } from "@/contexts/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
      <head>
        <link rel="preconnect" href="https://www.jimmymeetsworld.com" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-XBVoM37SGVm5YnvXWZ2VSO/1hxuXz71m3fQlpQOqF+08YEmtExElOL7slq+WjpY"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`bg-white dark:bg-gray-900 antialiased`}>
        <ThemeProvider>
          <FootnoteProvider>
            <Nav />
            <div className="w-full md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
            <Analytics />
          </FootnoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
