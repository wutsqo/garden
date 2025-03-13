import type { CollectionConfig } from "payload";

export type ImageSizeName = "wide";
export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "wide",
        width: 640,
        height: 360,
        formatOptions: {
          format: "webp",
          options: {
            compressionLevel: 9,
          },
        },
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "source",
      type: "text",
    },
  ],
};
