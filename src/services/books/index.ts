import { Book } from "./interface";
import {
  getDocuments,
  getDocumentBySlug,
  getDocumentSlugs,
} from "outstatic/server";

export async function getBooks(): Promise<Book[]> {
  const documents = getDocuments("books", [
    "title",
    "author",
    "body",
    "coverImage",
    "isRead",
    "slug",
  ]);
  const books: Book[] = documents.map((doc) => ({
    id: doc.slug,
    title: doc.title,
    author: doc.author?.name ?? "",
    body: doc.content,
    cover: doc.coverImage ?? "",
    status: doc.isRead ? "read" : "unread",
  }));
  return books;
}

export async function getBookSlugs(): Promise<string[]> {
  return getDocumentSlugs("books");
}

export async function getBookStaticPaths() {
  const slugs = await getBookSlugs();
  return slugs.map((slug) => ({
    id: slug,
  }));
}

export async function getBook(id: string): Promise<Book> {
  const document = getDocumentBySlug("books", id, [
    "title",
    "author",
    "body",
    "coverImage",
  ]);
  if (!document) {
    throw new Error("Book not found");
  }
  return {
    id: document.slug,
    title: document.title,
    author: document.author?.name ?? "",
    body: document.content,
    cover: document.coverImage ?? "",
    status: document.isRead ? "read" : "unread",
  };
}

export { type Book };
