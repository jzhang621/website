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
        const text = (header.textContent || "").replace(/^#+\s*/, "");

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
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update the URL hash without reloading the page
        window.history.pushState({}, "", `#${id}`);
      }
    };

    if (tocItems.length === 0) {
        return null;
    }

    return (
      <div className="TOC fixed left-4 top-[41px] mt-12 transform w-48 max-h-96 overflow-y-auto hidden xl:block">
        <div className="rounded-lg shadow-sm px-4">
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
                        ? "text-green-800 dark:text-zinc-200 font-medium"
                        : "text-muted-foreground hover:text-foreground"
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
