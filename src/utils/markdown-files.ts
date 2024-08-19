import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import path from "path";

const BASE_PATH = path.join(process.cwd(), "content");

export async function findMarkdownPath(dir: string, slug: string) {
  const exts = [".md", ".mdx"];
  for (const ext of exts) {
    const file = path.join(BASE_PATH, dir, `${slug}${ext}`);
    if (existsSync(file)) return file;
  }
  return null;
}

export async function getMarkdownFilePaths(directory: string) {
  const fullPath = path.join(BASE_PATH, directory);
  const files = await readdir(fullPath);
  return files
    .filter((file) => [".md", ".mdx"].includes(path.extname(file)))
    .map((file) => path.join(fullPath, file));
}

export async function getMarkdownFilenames(directory: string) {
  const fullPath = path.join(BASE_PATH, directory);
  const files = await readdir(fullPath);
  return files
    .filter((file) => [".md", ".mdx"].includes(path.extname(file)))
    .map((file) => path.basename(file, path.extname(file)));
}

export async function readMarkdownFile(fullPath: string) {
  return await readFile(fullPath, "utf-8");
}

export async function readMarkdownFileBySlug(dir: string, slug: string) {
  const file = await findMarkdownPath(dir, slug);
  if (!file) return null;
  return await readMarkdownFile(file);
}
