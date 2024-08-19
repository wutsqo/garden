import { Book } from "../interface";
import { getDocumentBySlug } from "@utils/collections";

export async function getBookBySlug(slug: string) {
  return await getDocumentBySlug<Book>("books", slug);
}
