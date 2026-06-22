import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import type { Media } from "@/payload.types";
import type { Payload, SanitizedConfig } from "payload";

const assetDir = process.env.CONTENT_ASSET_DIR ?? "/Users/muhammad.wutsqo/Projects/content/public/images";

const expertises = [
  "Frontend Development",
  "RESTful API",
  "Database Design",
  "Data Structures & Algorithms",
  "Clean Code",
  "Design Patterns",
  "TDD",
  "Agile Methodology",
  "Digital Product Design",
  "Communication & Teamwork",
];

const techStacks = [
  ["HTML", "stack/html.svg"],
  ["CSS", "stack/css.svg"],
  ["Javascript", "stack/js.svg"],
  ["Typescript", "stack/typescript.svg"],
  ["NodeJS", "stack/node.svg"],
  ["Python", "stack/py.svg"],
  ["Django", "stack/django.svg"],
  ["SQL", "stack/sql.svg"],
  ["Prisma", "stack/prisma.svg"],
  ["GraphQL", "stack/graphql.svg"],
  ["React", "stack/react.svg"],
  ["Svelte", "stack/svelte.svg"],
  ["Tailwind", "stack/tailwind.svg"],
  ["NextJS", "stack/next.svg"],
  ["Gatsby", "stack/gatsby.svg"],
  ["Styled", "stack/styled.svg"],
  ["Git", "stack/git.svg"],
  ["Figma", "stack/figma.svg"],
  ["Netlify", "stack/netlify.svg"],
  ["AWS", "stack/aws.svg"],
  ["Java", "stack/java.svg"],
] as const;

const socialLinks = [
  {
    label: "Email",
    url: "mailto:urwatilwutsqo16@gmail.com",
    icon: "email.svg",
    variant: "email",
  },
  {
    label: "GitHub",
    url: "https://github.com/wutsqo",
    icon: "github.svg",
    variant: "github",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/wutsqo",
    icon: "linkedin.svg",
    variant: "linkedin",
  },
  {
    label: "Spotify",
    url: "https://open.spotify.com/user/urwatilwutsqo",
    icon: "spotify.svg",
    variant: "spotify",
  },
] as const;

const getAssetPath = (filename: string): string => {
  const filePath = path.join(assetDir, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing seed asset: ${filePath}`);
  }

  return filePath;
};

const getOrCreateMedia = async ({
  alt,
  filename,
  payload,
}: {
  alt: string;
  filename: string;
  payload: Payload;
}): Promise<Media> => {
  const existing = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: path.basename(filename),
      },
    },
    limit: 1,
  });

  if (existing.docs[0]) {
    return payload.update({
      collection: "media",
      id: existing.docs[0].id,
      data: {
        alt,
        source: "Homepage Payload seed",
      },
      overrideAccess: true,
    });
  }

  return payload.create({
    collection: "media",
    data: {
      alt,
      source: "Homepage Payload seed",
    },
    filePath: getAssetPath(filename),
    overrideAccess: true,
  });
};

export const script = async (config: SanitizedConfig): Promise<void> => {
  const payload = await getPayload({ config });

  const socialMediaByVariant = new Map<(typeof socialLinks)[number]["variant"], Media>();
  for (const link of socialLinks) {
    const media = await getOrCreateMedia({ alt: `${link.label} icon`, filename: link.icon, payload });
    socialMediaByVariant.set(link.variant, media);
  }

  for (let index = 0; index < techStacks.length; index += 1) {
    const [name, filename] = techStacks[index];
    const logo = await getOrCreateMedia({ alt: `${name} logo`, filename, payload });
    const existing = await payload.find({
      collection: "tech-stacks",
      where: {
        name: {
          equals: name,
        },
      },
      limit: 1,
    });

    const data = {
      name,
      logo: logo.id,
      is_shown: true,
      weight: techStacks.length - index,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "tech-stacks",
        id: existing.docs[0].id,
        data,
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: "tech-stacks",
        data,
        overrideAccess: true,
      });
    }
  }

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      expertises: expertises.map((label) => ({ label })),
      socialLinks: socialLinks.map((link) => {
        const icon = socialMediaByVariant.get(link.variant);

        if (!icon) {
          throw new Error(`Missing uploaded media for ${link.label}`);
        }

        return {
          label: link.label,
          url: link.url,
          icon: icon.id,
          variant: link.variant,
        };
      }),
    },
    overrideAccess: true,
  });

  await payload.destroy();

  console.log(
    `Seeded ${expertises.length} expertises, ${techStacks.length} tech stacks, and ${socialLinks.length} social links.`,
  );
};
