import type { CollectionConfig } from "payload";
import { slug } from "@fields/slug";
import { revalidatePath } from "next/cache";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const Pages: CollectionConfig = {
  slug: "pages",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              {
                slug: "project-form",
                fields: [],
              },
            ],
          }),
        ],
      }),
    },
    slug({ trackingField: "title" }),
  ],
  admin: {
    useAsTitle: "title",
    preview: ({ slug }) => `/${slug}`,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePath(`/${doc.slug}`);
      },
    ],
  },
};
