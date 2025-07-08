"use client";

import React, { useState, useContext, createContext, useCallback } from "react";
import { FootnoteModal } from "./FootnoteModal";

interface FootnoteProps {
  id: string;
  children: React.ReactNode;
}

interface FootnoteContextType {
  footnotes: Map<string, React.ReactNode>;
  registerFootnote: (id: string, content: React.ReactNode) => void;
}

const FootnoteContext = createContext<FootnoteContextType>({
  footnotes: new Map(),
  registerFootnote: () => {},
});

export const FootnoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [footnotes, setFootnotes] = useState<Map<string, React.ReactNode>>(new Map());

  const registerFootnote = useCallback((id: string, content: React.ReactNode) => {
    setFootnotes((prev) => new Map(prev).set(id, content));
  }, []);

  return (
    <FootnoteContext.Provider value={{ footnotes, registerFootnote }}>
      {children}
    </FootnoteContext.Provider>
  );
};

export const Footnote: React.FC<FootnoteProps> = ({ id, children }) => {
    const { registerFootnote } = useContext(FootnoteContext);
    
    React.useEffect(() => {
        registerFootnote(id, children);
    }, [id, children, registerFootnote]);

    return (
      <div
        id={`footnote-${id}`}
        className="foonote text-sm text-gray-600 dark:text-gray-300 mt-4 mb-4 pl-2 border-l-0 border-gray-200 dark:border-gray-700 flex items-center"
      >
        <span className="text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0">[{id}]</span>
        {/* Remove margin-y from p tags that rendered and styled by mdx */}
        <span className="footnote-content [&>p]:!my-0 [&>p]:!text-sm">{children}</span>
      </div>
    );
};

export const FootnoteReference: React.FC<{ id: string }> = ({ id }) => {
    const { footnotes } = useContext(FootnoteContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const footnoteContent = footnotes.get(id);

    return (
      <>
        <sup>
          <button
            onClick={handleClick}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 no-underline text-sm cursor-pointer bg-transparent border-none p-0 font-inherit"
          >
            [{id}]
          </button>
        </sup>
        {footnoteContent && (
          <FootnoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            content={footnoteContent}
            footnoteId={id}
          />
        )}
      </>
    );
};
