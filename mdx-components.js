// This file is required to use @next/mdx in the `app` directory.
// import { MDXComponents } from "mdx/types";


export function useMDXComponents(components) {
    // Default components with custom styling
    const defaultComponents = {
        h1: ({ children }) => (
            <h1
                style={{
                    color: "#1a1a1a",
                    fontSize: "30px",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                }}
            >
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2
                style={{
                    fontSize: "32px",
                    color: "#3F5570",
                    marginTop: "2.75rem",
                    fontWeight: 600,
                }}
            >
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h2
                style={{
                    fontSize: "24px",
                    color: "#3F5570",
                    marginTop: "2rem",
                    fontWeight: 600,
                }}
            >
                {children}
            </h2>
        ),
        p: ({ children, parentClassName }) => {
            const isInNote = parentClassName === "note";

            return (
                <p
                    style={{
                        lineHeight: "1.8",
                        fontSize: "16px",
                        margin: isInNote ? "0" : "1.25rem 0",
                    }}
                >
                    {children}
                </p>
            );
        },
        ul: ({ children }) => (
            <ul style={{ paddingLeft: "1.5rem", listStyle: "disc", marginBottom: "1rem" }}>
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol style={{ paddingLeft: "1.5rem", listStyle: "decimal", marginBottom: "1rem" }}>
                {children}
            </ol>
        ),
        li: ({ children }) => <li style={{ marginBottom: "0.5rem" }}>{children}</li>,
        a: ({ children, href }) => (
            <a href={href} style={{ color: "blue", textDecoration: "underline" }}>
                {children}
            </a>
        ),
        em: ({ children }) => (
            <strong style={{ color: "#77A6A9", fontStyle: "italic" }}>{children}</strong>
        ),
        strong: ({ children }) => (
            <strong style={{ color: "#1a1a1a", fontWeight: 700 }}>{children}</strong>
        ),
    };

    // Merge default components with any custom components passed in
    return {
        ...defaultComponents,
        ...components,
    };
}
