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
      name: "expertises",
      type: "array",
      label: "Expertise Chips",
      labels: {
        singular: "Expertise",
        plural: "Expertise Chips",
      },
      admin: {
        description: "Manage the short expertise labels shown on the homepage.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
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
    {
      name: "socialLinks",
      type: "array",
      label: "Social Links",
      labels: {
        singular: "Social Link",
        plural: "Social Links",
      },
      admin: {
        description: "Manage the contact buttons shown on the homepage.",
        initCollapsed: true,
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
        {
          name: "icon",
          type: "upload",
          required: true,
          relationTo: "media",
          filterOptions: {
            mimeType: { contains: "image" },
          },
        },
        {
          name: "variant",
          type: "select",
          required: true,
          options: [
            {
              label: "Email",
              value: "email",
            },
            {
              label: "GitHub",
              value: "github",
            },
            {
              label: "LinkedIn",
              value: "linkedin",
            },
            {
              label: "Spotify",
              value: "spotify",
            },
          ],
        },
      ],
    },
  ],
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
