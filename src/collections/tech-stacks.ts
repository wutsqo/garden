import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

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
    {
      name: "is_shown",
      type: "checkbox",
      defaultValue: true,
      required: true,
      label: "Show on homepage",
    },
    {
      name: "weight",
      type: "number",
      defaultValue: 0,
      required: true,
      admin: {
        description: "Higher values appear first in the homepage stack carousel.",
      },
    },
  ],
  admin: {
    useAsTitle: "name",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/");
        } catch {
          // Payload scripts can run outside a Next.js static generation context.
        }
      },
    ],
  },
};
