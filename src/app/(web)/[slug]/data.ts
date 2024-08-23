import { getDocumentBySlug, getDocumentSlugs } from "@utils/collections";
import { DEFAULT_METADATA } from "@utils/metadata";
import { generateUrlWithParams } from "@utils/urls";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export interface PageMetadata {
  title: string;
  status: string;
  description: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

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
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const document = await getDocumentBySlug<PageMetadata>("pages", params.slug);
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
