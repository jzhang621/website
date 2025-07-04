"use client";

import { ReactNode, CSSProperties } from "react";
import { generateHeadingId } from "../lib/slugify";
import styles from "./LinkableHeading.module.css";

interface LinkableHeadingProps {
  level?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  showAnchor?: boolean;
}

const LinkableHeading: React.FC<LinkableHeadingProps> = ({
  level = "h1",
  children,
  style = {},
  className = "",
  showAnchor = true,
}) => {
  const id = generateHeadingId(children as string);
  const Tag = level as keyof JSX.IntrinsicElements;

  const headingStyle: CSSProperties = {
    ...style,
  };

  return (
    <Tag id={id} style={headingStyle} className={`${styles.heading} ${className}`}>
      {showAnchor && (
        <a
          href={`#${id}`}
          className={styles.anchor}
          aria-label={`Link to ${children}`}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              // Update URL without page reload
              window.history.pushState({}, "", `#${id}`);
            }
          }}
        >
          #
        </a>
      )}
      {children}
    </Tag>
  );
};

export default LinkableHeading;
