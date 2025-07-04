"use client";

import { useEffect, useState } from "react";
import { getAllHeadings, generateTableOfContents } from "../lib/headingUtils";

interface TableOfContentsProps {
  className?: string;
  maxDepth?: number;
}

interface TocItem {
  id: string;
  text: string;
  level: string;
  slug: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ className = "", maxDepth = 3 }) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = getAllHeadings();
    const tocItems = generateTableOfContents(headings).filter((item: TocItem) => {
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
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index} className={getIndentClass(item.level)}>
            <a
              href={`#${item.id}`}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  window.history.pushState(null, null, `#${item.id}`);
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
