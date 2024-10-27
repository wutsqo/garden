import { parseFrontmatter } from "./frontmatter";
import {
  findMarkdownPath,
  getMarkdownFilenames,
  getMarkdownFilePaths,
  readMarkdownFile,
} from "./markdown-files";

const COLLECTIONS = ["bookmarks", "pages", "books", "garden"] as const;
export type Collection = (typeof COLLECTIONS)[number];

export async function getDocuments<T extends Record<string, any>>(
  collection: Collection,
  {
    filter,
  }: {
    filter: Partial<T>;
  } = { filter: {} }
) {
  const files = await getMarkdownFilePaths(collection);
  const documents = await Promise.all(
    files.map(async (file) => ({
      ...parseFrontmatter<T>(await readMarkdownFile(file)),
      slug: file.replace(/\.(md|mdx)$/, ""),
    }))
  );
  const filtered = documents.filter((doc) =>
    Object.entries(filter).every(([key, value]) => doc.metadata[key] === value)
  );
  return filtered;
}

export async function getDocumentBySlug<T>(
  collection: Collection,
  slug: string
) {
  const file = await findMarkdownPath(collection, slug);
  if (!file) return null;
  return parseFrontmatter<T>(await readMarkdownFile(file));
}

export async function getDocumentSlugs(collection: Collection) {
  const files = await getMarkdownFilenames(collection);
  return files.map((file) => file.replace(/\.(md|mdx)$/, ""));
}
