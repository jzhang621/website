import React from "react";

interface CitationProps {
    id?: string;
    children: React.ReactNode;
}

export const Citation: React.FC<CitationProps> = ({ id, children }) => {
    return (
        <div
            id={id ? `citation-${id}` : undefined}
            className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
            <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Citation:</span> {children}
            </div>
        </div>
    );
};

export const CitationReference: React.FC<{ id: string }> = ({ id }) => {
    return (
        <sup>
            <a
                href={`#citation-${id}`}
                id={`citation-ref-${id}`}
                className="text-blue-600 hover:text-blue-800 no-underline text-sm"
            >
                [{id}]
            </a>
        </sup>
    );
};
