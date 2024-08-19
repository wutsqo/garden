/**
 * Transform the raw content of a markdown file into metadata and content
 * @param fileContent - The raw content of a markdown file
 * @returns The metadata and content of the markdown file
 * @example transformRawContent("---\ntitle: Hello, World!\n---\nHello, World!");
 */
export function parseFrontmatter<T>(fileContent: string) {
  const fmRegex = /---\s*([\s\S]*?)\s*---/;
  const fmBlock = fmRegex.exec(fileContent)![1];
  const fmLines = fmBlock.trim().split("\n");
  const metadata = fmLines.reduce((acc, line) => {
    const [key, ...value] = line.split(": ");
    return {
      ...acc,
      [key.trim()]: value
        .join(": ")
        .trim()
        .replace(/^['"](.*)['"]$/, "$1"),
    };
  }, {} as T);
  const content = fileContent.replace(fmRegex, "").trim();
  return { metadata, content };
}
