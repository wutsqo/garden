import { slug } from "@fields/slug";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "category",
      type: "select",
      hasMany: false,
      required: true,
      options: [
        {
          label: "App/Product",
          value: "App/Product",
        },
        {
          label: "Backend/API",
          value: "Backend/API",
        },
        {
          label: "Landing Page",
          value: "Landing Page",
        },
        {
          label: "App/Features",
          value: "App/Features",
        },
        {
          label: "Discord Bot",
          value: "Discord Bot",
        },
        {
          label: "Dev Tools",
          value: "Dev Tools",
        },
        {
          label: "App/Website",
          value: "App/Website",
        },
      ],
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "live_url",
      type: "text",
    },
    {
      name: "repo_url",
      type: "text",
    },
    {
      name: "tech_stack",
      type: "relationship",
      relationTo: "tech-stacks",
      hasMany: true,
      required: true,
    },
    {
      name: "write_up",
      type: "richText",
    },
    slug({ trackingField: "title" }),
    {
      name: "is_shown",
      type: "checkbox",
      defaultValue: true,
      required: true,
    },
    {
      name: "weight",
      type: "number",
      defaultValue: 0,
      required: true,
    },
    {
      name: "team_members",
      type: "array",
      fields: [
        {
          name: "name",
          type: "relationship",
          relationTo: "teammates",
          required: true,
        },
        {
          name: "role",
          type: "text",
        },
      ],
    },
    {
      name: "timeline",
      type: "text",
    },
  ],
  admin: {
    useAsTitle: "title",
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/");
        revalidatePath(`/projects`);
      },
    ],
  },
};
