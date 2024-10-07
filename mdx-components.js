// This file is required to use @next/mdx in the `app` directory.
// import { MDXComponents } from "mdx/types";

export function useMDXComponents(components) {
    // Default components with custom styling
    const defaultComponents = {
        h1: ({ children }) => (
            <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "1rem" }}>
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2
                style={{
                    fontSize: "25px",
                    color: "#778DA9",
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
                    fontSize: "22px",
                    color: "#778DA9",
                    marginTop: "2rem",
                    fontWeight: 600,
                }}
            >
                {children}
            </h2>
        ),
        p: ({ children }) => (
            <p style={{ lineHeight: "1.8", fontSize: "16px", margin: "1.25rem 0" }}>{children}</p>
        ),
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
    };

    // Merge default components with any custom components passed in
    return {
        ...defaultComponents,
        ...components,
    };
}
