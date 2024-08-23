import { getDocuments } from "@utils/collections";
import { BookmarkItem } from "./interface";

export async function getBookmarks(): Promise<BookmarkItem[]> {
  const documents = await getDocuments<BookmarkItem>("bookmarks");
  const bookmarks: BookmarkItem[] = documents.map((doc) => ({
    id: doc.slug,
    date: doc.metadata.date,
    comment: doc.content,
    url: doc.metadata?.url,
    title: doc.metadata.title,
    tags: [],
  }));
  return bookmarks;
}
