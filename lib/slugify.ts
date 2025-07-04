/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns The slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Trim hyphens from start
    .replace(/-+$/, ""); // Trim hyphens from end
}

/**
 * Generate a unique ID for a heading
 * @param text - The heading text
 * @returns The unique ID
 */
export function generateHeadingId(text: string): string {
  return slugify(text);
}
