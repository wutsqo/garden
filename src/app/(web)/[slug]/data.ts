import { getDocumentBySlug, getDocumentSlugs } from "@utils/collections";
import { DEFAULT_METADATA } from "@utils/metadata";
import { generateUrlWithParams } from "@utils/urls";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageMetadata, Params } from "./interface";

export async function getPageData(slug: string) {
  return await getDocumentBySlug<PageMetadata>("pages", slug);
}

export async function generatePageSlugs() {
  const slugs = await getDocumentSlugs("pages");
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generatePageMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const document = await getDocumentBySlug<PageMetadata>("pages", slug);
  if (!document) notFound();
  const {
    metadata: { title, description },
  } = document;
  const image = generateUrlWithParams("/api/og", {
    title,
    description,
  });
  return {
    ...DEFAULT_METADATA,
    title,
    description,
    twitter: {
      ...DEFAULT_METADATA.twitter,
      title,
      description,
      images: {
        url: image,
        alt: title,
      },
    },
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}
