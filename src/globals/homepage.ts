import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: {
    group: "Website",
    description: "Edit singleton content that appears on the homepage.",
  },
  fields: [
    {
      name: "employmentHistory",
      type: "array",
      label: "Employment History",
      labels: {
        singular: "Employment Entry",
        plural: "Employment History",
      },
      admin: {
        description: "Manage the experience section shown on the homepage.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "company",
          type: "text",
          required: true,
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Company logo",
          filterOptions: {
            mimeType: { contains: "image" },
          },
        },
        {
          name: "role",
          type: "text",
          required: true,
        },
        {
          name: "period",
          type: "text",
          required: true,
          label: "Period / Date Text",
        },
        {
          name: "location",
          type: "text",
          label: "Location",
        },
        {
          name: "summary",
          type: "textarea",
          label: "Summary",
        },
        {
          name: "isCurrentRole",
          type: "checkbox",
          label: "Current role",
          defaultValue: false,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/");
      },
    ],
  },
};
