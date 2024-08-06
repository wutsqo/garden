import { Metadata } from "next";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";

export async function getPageData(slug: string) {
  const document = getDocumentBySlug("pages", slug, [
    "title",
    "subtitle",
    "description",
    "publishedAt",
    "content",
    "coverImage",
  ]);
  return document;
}

export async function getPageSlugs() {
  const slugs = getDocumentSlugs("pages");
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function getPageMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const data = await getPageData(params.slug);
  const title = data?.title ?? "";
  const description = data?.description;
  let ogImageUrl = `${
    process.env.SITE_URL ?? "http://localhost:3000"
  }/api/og?title=${title}`;
  if (description) ogImageUrl += `&description=${description}`;

  return {
    title: title,
    description: data?.description,
    openGraph: {
      title: title,
      url: process.env.SITE_URL ?? "http://localhost:3000",
      description: data?.description,
      siteName: "Muhammad Urwatil Wutsqo",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}
