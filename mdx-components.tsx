// This file is required to use @next/mdx in the `app` directory.
import { MDXComponents } from "mdx/types";
import { Footnote, FootnoteReference } from "./components/Footnote";
import { Citation, CitationReference } from "./components/Citation";
import LinkableHeading from "./components/LinkableHeading";
import styles from "./components/mdx-components.module.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // Default components with LessWrong/Notion-inspired styling
  const defaultComponents: MDXComponents = {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <LinkableHeading level="h1" className={styles.h1}>
        {children}
      </LinkableHeading>
    ),

    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <LinkableHeading level="h2" className={styles.h2}>
        {children}
      </LinkableHeading>
    ),

    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <LinkableHeading level="h3" className={styles.h3}>
        {children}
      </LinkableHeading>
    ),

    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <LinkableHeading level="h4" className={styles.h4}>
        {children}
      </LinkableHeading>
    ),

    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
      return <p className={styles.paragraph}>{children}</p>;
    },

    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={styles.ul}>{children}</ul>
    ),

    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={styles.ol}>{children}</ol>
    ),

    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className={styles.li}>{children}</li>
    ),

    a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a href={href} className={styles.link}>
        {children}
      </a>
    ),

    em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <em className={styles.em}>{children}</em>
    ),

    strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <strong className={styles.strong}>{children}</strong>
    ),

    blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
      <blockquote className={`${styles.blockquote} ${styles["mdx-blockquote"]}`}>
        {children}
      </blockquote>
    ),

    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <pre className={styles.pre} {...props}>
        {children}
      </pre>
    ),

    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code className={styles.code} {...props}>
        {children}
      </code>
    ),

    // Additional components for better content structure
    hr: () => <hr className={styles.hr} />,

    table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>{children}</table>
      </div>
    ),

    th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th className={styles.th}>{children}</th>
    ),

    td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
      <td className={styles.td}>{children}</td>
    ),

    // Add new components for citations and footnotes
    Citation: ({ children, id }: { children: React.ReactNode; id: string }) => (
      <Citation id={id}>{children}</Citation>
    ),

    CitationRef: ({ id }: { id: string }) => <CitationReference id={id} />,

    // Add a component for a collection of citations
    Citations: ({ children }: { children: React.ReactNode }) => (
      <div className={styles.citations}>
        <h2 className={styles.citationsTitle}>Citations</h2>
        <div className={styles.citationsList}>{children}</div>
      </div>
    ),

    Footnote: ({ children, id }: { children: React.ReactNode; id: string }) => (
      <Footnote id={id}>{children}</Footnote>
    ),

    FootnoteRef: ({ id }: { id: string }) => <FootnoteReference id={id} />,

    // Add a component for a collection of footnotes
    Footnotes: ({ children }: { children: React.ReactNode }) => (
      <div className={styles.footnotes}>
        <h2 className={styles.footnotesTitle}>References</h2>
        <div className={styles.footnotesList}>{children}</div>
      </div>
    ),

    // Add a component for bibliography
    Bibliography: ({ children }: { children: React.ReactNode }) => (
      <div className={styles.bibliography}>
        <h1 className={styles.bibliographyTitle}>References</h1>
        <div className={styles.bibliographyList}>{children}</div>
      </div>
    ),

    // Add a component for individual bibliography items
    BibItem: ({ id, children }: { id: string; children: React.ReactNode }) => (
      <div id={`bib-${id}`} className={styles.bibItem}>
        <span className={styles.bibItemId}>[{id}]</span>
        {children}
      </div>
    ),

    // Add a component for bibliography references
    BibRef: ({ id }: { id: string }) => (
      <sup className={styles.bibRef}>
        <a href={`#bib-${id}`} className={styles.bibRefLink}>
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