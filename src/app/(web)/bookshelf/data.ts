import { getDocuments } from "@utils/collections";
import { Book } from "./interface";

export async function getBooks() {
  return await getDocuments<Book>("books");
}
