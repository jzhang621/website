import { generateHeadingId } from "./slugify";

/**
 * Get all headings from the current page
 * @returns {Array} Array of heading elements with their IDs and text
 */
export function getAllHeadings() {
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
 * @param {string} id - The heading ID
 * @param {Object} options - Scroll options
 */
export function scrollToHeading(id, options = {}) {
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
 * @param {Array} headings - Array of heading objects
 * @returns {Array} Array of TOC items
 */
export function generateTableOfContents(headings) {
  return headings.map((heading) => ({
    id: heading.id,
    text: heading.text,
    level: heading.level,
    slug: heading.id.replace(/^h\d+-/, ""),
  }));
}

/**
 * Test if a heading ID is valid
 * @param {string} text - The heading text
 * @param {string} level - The heading level
 * @returns {boolean} Whether the generated ID is valid
 */
export function testHeadingId(text, level = "h1") {
  const id = generateHeadingId(text, level);
  return {
    text,
    level,
    id,
    isValid: /^[a-z0-9-]+$/.test(id.replace(/^h\d+-/, "")),
    slug: id.replace(/^h\d+-/, ""),
  };
}
