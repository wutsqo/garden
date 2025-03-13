import type { CollectionConfig } from "payload";

export const TechStacks: CollectionConfig = {
  slug: "tech-stacks",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      required: true,
      relationTo: "media",
    },
  ],
  admin: {
    useAsTitle: "name",
  },
};
