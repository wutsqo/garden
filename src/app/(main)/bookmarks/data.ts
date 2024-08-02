import { BookmarkItem } from "./interface";
import { getDocuments } from "outstatic/server";

export async function getBookmarks(): Promise<BookmarkItem[]> {
  const documents = getDocuments("bookmarks", [
    "title",
    "url",
    "content",
    "date",
    "tags",
    "slug",
  ]);
  const bookmarks: BookmarkItem[] = documents.map((doc) => ({
    id: doc.slug,
    date: doc.publishedAt,
    comment: doc.content,
    url: doc.url as string,
    title: doc.title,
    tags: (
      doc.tags as {
        label: string;
        value: string;
      }[]
    ).map((tag) => ({ id: tag.value, name: tag.label })),
  }));
  return bookmarks;
}
