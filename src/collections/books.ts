import type { CollectionConfig } from "payload";
import { slug } from "@fields/slug";
export const Books: CollectionConfig = {
  slug: "books",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "sinopsis",
      type: "richText",
      label: "Sinopsis",
    },
    {
      name: "cover_image",
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "image" },
      },
      required: true,
    },
    slug({ trackingField: "title" }),
    {
      name: "status",
      type: "select",
      options: [
        { label: "to be read", value: "tbr" },
        { label: "reading", value: "reading" },
        { label: "read", value: "read" },
      ],
    },
  ],
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status"],
  },
};
