"use client";

import { useState, useEffect } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TOC() {
    const [tocItems, setTocItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Extract all h2 and h3 elements from the page
        const headers = document.querySelectorAll("h2, h3");

        const items: TOCItem[] = [];

        headers.forEach((header, index) => {
            const level = parseInt(header.tagName.charAt(1));
            const text = header.textContent || "";

            // Create an ID if it doesn't exist
            let id = header.id;
            if (!id) {
                id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                header.id = id;
            }

            items.push({ id, text, level });
        });

        setTocItems(items);

        // Set up intersection observer for active section highlighting
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-100px 0px -80% 0px",
            }
        );

        headers.forEach((header) => {
            observer.observe(header);
        });

        return () => {
            headers.forEach((header) => {
                observer.unobserve(header);
            });
        };
    }, []);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (tocItems.length === 0) {
        return null;
    }

    return (
        <div className="fixed left-4 top-1/3 transform -translate-y-1/2 w-64 max-h-96 overflow-y-auto hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-md font-semibold text-gray-900 mb-3">Table of Contents</h3>
                <nav>
                    <ul className="space-y-1">
                        {tocItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleClick(item.id)}
                                    className={`
                    block w-full text-left text-xs leading-5 transition-colors
                    ${item.level === 2 ? "pl-0" : "pl-4"}
                    ${
                        activeId === item.id
                            ? "text-green-800 font-medium"
                            : "text-slate-600 hover:text-green-900"
                    }
                  `}
                                >
                                    {item.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
