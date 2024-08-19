import { getDocuments, getDocumentSlugs } from "@utils/collections";
import { Book } from "./interface";

export async function getBooks() {
  return await getDocuments<Book>("books");
}

export async function generateBookSlugs() {
  const slugs = await getDocumentSlugs("books");
  return slugs.map((id) => ({
    id,
  }));
}
