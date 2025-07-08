"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
    const pathname = usePathname();
    if (pathname === "/") return null;

    return (
      <nav className="bg-[#8DA97711] dark:bg-gray-800/20 py-2">
        <div className="max-w-5xl flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-slate-800 transition-colors relative z-10"
            aria-label="Go to home page"
            title="Go to home page"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    );
}
