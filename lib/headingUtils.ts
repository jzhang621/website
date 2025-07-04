import { generateHeadingId } from "./slugify";

export interface HeadingElement {
  id: string;
  text: string | null;
  level: string;
  element: Element;
}

export interface TOCItem {
  id: string;
  text: string | null;
  level: string;
  slug: string;
}

export interface HeadingTestResult {
  text: string;
  level: string;
  id: string;
  isValid: boolean;
  slug: string;
}

/**
 * Get all headings from the current page
 * @returns Array of heading elements with their IDs and text
 */
export function getAllHeadings(): HeadingElement[] {
  if (typeof window === "undefined") return [];

  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  return Array.from(headings).map((heading) => ({
    id: heading.id,
    text: heading.textContent,
    level: heading.tagName.toLowerCase(),
    element: heading,
  }));
}

/**
 * Scroll to a heading by ID
 * @param id - The heading ID
 * @param options - Scroll options
 */
export function scrollToHeading(id: string, options: ScrollIntoViewOptions = {}): void {
  if (typeof window === "undefined") return;

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      ...options,
    });
  }
}

/**
 * Generate a table of contents from headings
 * @param headings - Array of heading objects
 * @returns Array of TOC items
 */
export function generateTableOfContents(headings: HeadingElement[]): TOCItem[] {
  return headings.map((heading) => ({
    id: heading.id,
    text: heading.text,
    level: heading.level,
    slug: heading.id.replace(/^h\d+-/, ""),
  }));
}

/**
 * Test if a heading ID is valid
 * @param text - The heading text
 * @param level - The heading level
 * @returns Whether the generated ID is valid
 */
export function testHeadingId(text: string, level: string = "h1"): HeadingTestResult {
  const id = generateHeadingId(text);
  return {
    text,
    level,
    id,
    isValid: /^[a-z0-9-]+$/.test(id.replace(/^h\d+-/, "")),
    slug: id.replace(/^h\d+-/, ""),
  };
}
