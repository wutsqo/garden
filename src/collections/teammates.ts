import type { CollectionConfig } from "payload";

export const Teammates: CollectionConfig = {
  slug: "teammates",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "text",
    },
  ],
  admin: {
    useAsTitle: "name",
  },
};
