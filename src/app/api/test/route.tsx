import { generatePageSlugs } from "../../[slug]/data";
import { getDocuments, getDocumentSlugs } from "@utils/collections";

export async function GET(req: Request) {
  return Response.json(await getDocumentSlugs("books"));
}
