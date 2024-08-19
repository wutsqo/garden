/**
 * Get the metadata of a markdown file
 * @param filePath - The path to the markdown file
 * @returns The metadata of the markdown file
 * @example getMarkdownMetadata("content/pages/hello-world.md");
 */
export function formatRelativeDate(date: string) {
  const current = new Date();
  const target = new Date(date);

  const yearDiff = current.getFullYear() - target.getFullYear();
  const monthDiff = current.getMonth() - target.getMonth();
  const dayDiff = current.getDate() - target.getDate();

  if (yearDiff > 0) return `${yearDiff} year${yearDiff > 1 ? "s" : ""} ago`;
  if (monthDiff > 0) return `${monthDiff} month${monthDiff > 1 ? "s" : ""} ago`;
  if (dayDiff > 0) return `${dayDiff} day${dayDiff > 1 ? "s" : ""} ago`;

  return "Today";
}
