import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";
export const BookTimelines: CollectionConfig = {
  slug: "book-timelines",
  fields: [
    {
      name: "time",
      type: "date",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "To be read", value: "tbr" },
        { label: "Started", value: "started" },
        { label: "Comment", value: "comment" },
        { label: "Finished", value: "finished" },
        { label: "Not finished", value: "not-finished" },
      ],
      required: true,
    },
    {
      name: "comment",
      type: "richText",
    },
    {
      name: "book",
      type: "relationship",
      relationTo: "books",
      required: true,
    },
  ],
  admin: {
    useAsTitle: "book",
    defaultColumns: ["book", "time", "type"],
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        console.log("🚀 ~ doc:", doc);
        const book = await req.payload.findByID({ collection: "books", id: doc.book, select: { slug: true } });
        revalidatePath(`/bookshelf/${book.slug}`);
      },
    ],
  },
};
