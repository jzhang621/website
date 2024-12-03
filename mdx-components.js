// This file is required to use @next/mdx in the `app` directory.
// import { MDXComponents } from "mdx/types";
import Latex from "./components/Latex";

export function useMDXComponents(components) {
    // Default components with custom styling
    const defaultComponents = {
        Latex: ({ children }) => <Latex>{children}</Latex>,
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
                    marginTop: "2.25rem",
                    fontWeight: 600,
                }}
            >
                {children}
            </h2>
        ),
        Latex: ({ children }) => (
            <Latex style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
                {children}
            </Latex>
        ),        
        p: ({ children, ...props }) => {
            const style = {
                lineHeight: "1.8",
                fontSize: "16px",
                margin: "1.25rem 0",
            };

            // Check if the parent is a figcaption
            const isInFigcaption = props.parentName === 'figcaption';

            return (
                <p style={isInFigcaption ? {} : style}>
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
        blockquote: ({ children }) => (
            <blockquote style={{ width: "75%", margin: "1.5rem auto", borderLeft: "4px solid #cbbd93", paddingLeft: "1rem"  }}>
                {children}
            </blockquote>
        ),

        
    };

    // Merge default components with any custom components passed in
    return {
        ...defaultComponents,
        ...components,
        pre: ({ children, ...props }) => (
            <pre
                style={{
                    backgroundColor: "#1a1a1a",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    overflow: "auto",
                    marginBottom: "1.5rem",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                }}
                {...props}
            >
                {children}
            </pre>
        ),
        code: ({ children, ...props }) => (
            <code
                style={{
                    fontFamily: "monospace",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875em",
                }}
                {...props}
            >
                {children}
            </code>
        ),
    };
}
