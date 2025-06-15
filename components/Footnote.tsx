import React from "react";

interface FootnoteProps {
    id: string;
    children: React.ReactNode;
}

export const Footnote: React.FC<FootnoteProps> = ({ id, children }) => {
    return (
        <div
            id={`footnote-${id}`}
            className="text-sm text-gray-600 mt-4 mb-4 pl-2 border-l-0 border-gray-200 flex items-center"
        >
            <span className="text-gray-400 mr-2 flex-shrink-0">[{id}]</span>
            <span>{children}</span>
        </div>
    );
};

export const FootnoteReference: React.FC<{ id: string }> = ({ id }) => {
    return (
        <sup>
            <a
                href={`#footnote-${id}`}
                id={`footnote-ref-${id}`}
                className="text-slate-500 hover:text-slate-800 no-underline text-sm"
            >
                [{id}]
            </a>
        </sup>
    );
};
