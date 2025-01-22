import { getPayload } from "payload";
import config from "@payload-config";

export async function getBooks() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "books",
    pagination: false,
  });
  return result.docs;
}

export async function generateBookSlugs() {
  const payload = await getPayload({ config });
  const slugs = await payload.find({
    collection: "books",
    select: {
      slug: true,
    },
    pagination: false,
  });
  return slugs.docs.map((slug) => ({
    id: slug.slug,
  }));
}

export async function getBookBySlug(slug: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "books",
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  return result.docs[0];
}
