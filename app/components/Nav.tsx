"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Nav() {
    const pathname = usePathname();
    if (pathname === "/") return null;

    return (
        <nav className="bg-[#8DA97711] py-2">
            <div className="max-w-5xl text-center mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-center text-md text-gray-600 hover:text-gray-900">
                    Home
                </Link>
            </div>
        </nav>
    );
}
