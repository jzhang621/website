import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const figtree = localFont({
  src: "./fonts/Figtree.woff2",
  weight: "300 900",
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jimmymeetsworld.com"),
  title: "Jimmy Zhang · Interactive lessons",
  description:
    "Interactive lessons by Jimmy Zhang that teach algorithms and linear algebra by letting you try things first.",
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
