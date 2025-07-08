"use client";

import { useEffect, useState } from "react";
import { getAllHeadings, generateTableOfContents, TOCItem } from "../lib/headingUtils";

interface TableOfContentsProps {
  className?: string;
  maxDepth?: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ className = "", maxDepth = 3 }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const headings = getAllHeadings();
    const tocItems = generateTableOfContents(headings).filter((item: TOCItem) => {
      const level = parseInt(item.level.replace("h", ""));
      return level <= maxDepth;
    });
    setToc(tocItems);
  }, [maxDepth]);

  if (toc.length === 0) {
    return null;
  }

  const getIndentClass = (level: string) => {
    const indentMap: Record<string, string> = {
      h1: "",
      h2: "ml-4",
      h3: "ml-8",
      h4: "ml-12",
      h5: "ml-16",
      h6: "ml-20",
    };
    return indentMap[level] || "";
  };

  return (
    <nav className={`toc ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index} className={getIndentClass(item.level)}>
            <a
              href={`#${item.id}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 block py-1"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  window.history.pushState(null, "", `#${item.id}`);
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
