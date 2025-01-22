import { Field } from "payload";
import _ from "lodash";

type Slug = (options?: { trackingField?: string }, overrides?: Partial<Field>) => Field;

export const slug: Slug = ({ trackingField = "title" } = {}, overrides) =>
  _.merge<Field, Partial<Field> | undefined>(
    {
      name: "slug",
      unique: true,
      type: "text",
      admin: {
        position: "sidebar",
        components: {
          Field: {
            path: "@/components/slug-input",
            exportName: "SlugInput",
            clientProps: {
              trackingField,
            },
          },
        },
      },
    },
    overrides,
  );
