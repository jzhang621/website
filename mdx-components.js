// This file is required to use @next/mdx in the `app` directory.
// import { MDXComponents } from "mdx/types";
import Latex from "./components/Latex";
import { Footnote, FootnoteReference } from "./components/Footnote";
import { Citation, CitationReference } from "./components/Citation";

// Import Inter font - add this to your layout.tsx or _app.tsx if not already imported
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

export function useMDXComponents(components) {
    // Default components with LessWrong/Notion-inspired styling
    const defaultComponents = {
        Latex: ({ children }) => (
            <Latex
                style={{
                    margin: "2rem 0",
                    padding: "1rem",
                    backgroundColor: "#fafafa",
                    borderRadius: "6px",
                    border: "1px solid #e5e5e5",
                }}
            >
                {children}
            </Latex>
        ),

        h1: ({ children }) => (
            <h1
                style={{
                    fontFamily: "var(--font-inter)",
                    color: "#1a1a1a",
                    fontSize: "2.25rem",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    marginTop: "3rem",
                    marginBottom: "1.5rem",
                    letterSpacing: "-0.025em",
                    borderBottom: "2px solid #e5e5e5",
                    paddingBottom: "0.75rem",
                }}
            >
                {children}
            </h1>
        ),

        h2: ({ children }) => (
            <h2
                style={{
                    fontFamily: "var(--font-inter)",
                    color: "#2d2d2d",
                    fontSize: "1.875rem",
                    fontWeight: "600",
                    lineHeight: "1.3",
                    marginTop: "3rem",
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.015em",
                }}
            >
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3
                style={{
                    fontFamily: "var(--font-inter)",
                    color: "#404040",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    lineHeight: "1.4",
                    marginTop: "2.5rem",
                    marginBottom: "1rem",
                    letterSpacing: "-0.01em",
                }}
            >
                {children}
            </h3>
        ),

        h4: ({ children }) => (
            <h4
                style={{
                    fontFamily: "var(--font-inter)",
                    color: "#525252",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    lineHeight: "1.4",
                    marginTop: "2rem",
                    marginBottom: "0.75rem",
                }}
            >
                {children}
            </h4>
        ),

        p: ({ children, ...props }) => {
            const style = {
                fontFamily: "var(--font-inter)",
                lineHeight: "1.75",
                fontSize: "1rem",
                color: "#374151",
                margin: "1.5rem 0",
                maxWidth: "none",
            };

            // Check if the parent is a figcaption
            const isInFigcaption = props.parentName === "figcaption";

            return (
                <p
                    style={
                        isInFigcaption
                            ? {
                                  fontFamily: "var(--font-inter)",
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                  fontStyle: "italic",
                                  textAlign: "center",
                                  marginTop: "0.5rem",
                              }
                            : style
                    }
                >
                    {children}
                </p>
            );
        },

        ul: ({ children }) => (
            <ul
                style={{
                    paddingLeft: "1.75rem",
                    listStyle: "disc",
                    listStyleColor: "#9ca3af",
                    margin: "1.5rem 0",
                }}
            >
                {children}
            </ul>
        ),

        ol: ({ children }) => (
            <ol
                style={{
                    paddingLeft: "1.75rem",
                    listStyle: "decimal",
                    listStyleColor: "#9ca3af",
                    margin: "1.5rem 0",
                }}
            >
                {children}
            </ol>
        ),

        li: ({ children }) => (
            <li
                style={{
                    fontFamily: "var(--font-inter)",
                    marginBottom: "0.75rem",
                    lineHeight: "1.7",
                    color: "#374151",
                }}
            >
                {children}
            </li>
        ),

        a: ({ children, href }) => (
            <a
                href={href}
                style={{
                    fontFamily: "var(--font-inter)",
                    color: "#0284c7",
                    textDecoration: "underline",
                    textDecorationColor: "#e2e8f0",
                    textUnderlineOffset: "3px",
                    fontWeight: "500",
                }}
            >
                {children}
            </a>
        ),

        em: ({ children }) => (
            <em
                style={{
                    fontFamily: "var(--font-inter)",
                    fontStyle: "italic",
                }}
            >
                {children}
            </em>
        ),

        strong: ({ children }) => (
            <strong
                style={{
                    fontFamily: "var(--font-inter)",
                    color: "#1f2937",
                    fontWeight: "700",
                }}
            >
                {children}
            </strong>
        ),

        blockquote: ({ children }) => (
            <blockquote
                className="mdx-blockquote"
                style={{
                    fontFamily: "var(--font-inter)",
                    margin: "1rem",
                    padding: "1.5rem 2rem",
                    backgroundColor: "#f8fafc",
                    borderLeft: "4px solid #3b82f6",
                    borderRadius: "0 6px 6px 0",
                    fontStyle: "italic",
                    color: "#475569",
                    fontSize: "1.05rem",
                    lineHeight: "1.7",
                }}
            >
                {children}
            </blockquote>
        ),

        pre: ({ children, ...props }) => (
            <pre
                style={{
                    backgroundColor: "#1e293b",
                    color: "#e2e8f0",
                    padding: "1rem",
                    borderRadius: "8px",
                    overflow: "auto",
                    margin: "2rem 0",
                    fontSize: "0.875rem",
                    lineHeight: "1.6",
                    border: "1px solid #334155",
                    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                }}
                {...props}
            >
                {children}
            </pre>
        ),

        code: ({ children, ...props }) => (
            <code
                style={{
                    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                    backgroundColor: "#f1f5f9",
                    color: "#e11d48",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.875em",
                    fontWeight: "500",
                    border: "1px solid #e2e8f0",
                }}
                {...props}
            >
                {children}
            </code>
        ),

        // Additional components for better content structure
        hr: () => (
            <hr
                style={{
                    border: "none",
                    height: "2px",
                    backgroundColor: "#e5e7eb",
                    margin: "1.5rem 0",
                    width: "100%",
                    maxWidth: "800px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            />
        ),

        table: ({ children }) => (
            <div
                style={{
                    overflowX: "auto",
                    margin: "2rem 0",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.875rem",
                    }}
                >
                    {children}
                </table>
            </div>
        ),

        th: ({ children }) => (
            <th
                style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: "#f9fafb",
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb",
                }}
            >
                {children}
            </th>
        ),

        td: ({ children }) => (
            <td
                style={{
                    fontFamily: "var(--font-inter)",
                    padding: "0.75rem 1rem",
                    borderBottom: "1px solid #f3f4f6",
                    color: "#6b7280",
                }}
            >
                {children}
            </td>
        ),

        // Add new components for citations and footnotes
        Citation: ({ children, id }) => <Citation id={id}>{children}</Citation>,

        CitationRef: ({ id }) => <CitationReference id={id} />,

        // Add a component for a collection of citations
        Citations: ({ children }) => (
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Citations</h2>
                <div className="space-y-4">{children}</div>
            </div>
        ),

        Footnote: ({ children, id }) => <Footnote id={id}>{children}</Footnote>,

        FootnoteRef: ({ id }) => <FootnoteReference id={id} />,

        // Add a component for a collection of footnotes
        Footnotes: ({ children }) => (
            <div className="footnote my-8 pt-8 border-t border-gray-200">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">References</h2>
                <div className="space-y-2">{children}</div>
            </div>
        ),

        // Add a component for bibliography
        Bibliography: ({ children }) => (
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">References</h1>
                <div className="space-y-4">{children}</div>
            </div>
        ),

        // Add a component for individual bibliography items
        BibItem: ({ id, children }) => (
            <div id={`bib-${id}`} className="text-sm text-gray-600">
                <span className="text-gray-400 mr-2">[{id}]</span>
                {children}
            </div>
        ),

        // Add a component for bibliography references
        BibRef: ({ id }) => (
            <sup>
                <a
                    href={`#bib-${id}`}
                    className="text-blue-600 hover:text-blue-800 no-underline text-sm"
                >
                    [{id}]
                </a>
            </sup>
        ),
    };

    // Merge default components with any custom components passed in
    return {
        ...defaultComponents,
        ...components,
    };
}