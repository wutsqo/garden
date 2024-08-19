import { parseFrontmatter } from "./frontmatter";
import {
  findMarkdownPath,
  getMarkdownFilenames,
  getMarkdownFilePaths,
  readMarkdownFile,
} from "./markdown-files";

const COLLECTIONS = ["bookmarks", "pages", "books"] as const;
export type Collection = (typeof COLLECTIONS)[number];

export async function getDocuments<T>(collection: Collection) {
  const files = await getMarkdownFilePaths(collection);
  const documents = await Promise.all(
    files.map(async (file) => ({
      ...parseFrontmatter<T>(await readMarkdownFile(file)),
      slug: file.replace(/\.(md|mdx)$/, ""),
    })),
  );
  return documents;
}

export async function getDocumentBySlug<T>(
  collection: Collection,
  slug: string,
) {
  const file = await findMarkdownPath(collection, slug);
  if (!file) return null;
  return parseFrontmatter<T>(await readMarkdownFile(file));
}

export async function getDocumentSlugs(collection: Collection) {
  const files = await getMarkdownFilenames(collection);
  return files.map((file) => file.replace(/\.(md|mdx)$/, ""));
}
