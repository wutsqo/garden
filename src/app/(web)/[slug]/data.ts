import { DEFAULT_METADATA } from "@utils/metadata";
import { generateUrlWithParams } from "@utils/urls";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Params } from "./interface";
import { getPayload } from "payload";
import config from "@payload-config";

export async function getPageData(slug: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    select: {
      content: true,
      title: true,
      description: true,
    },
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (result.docs.length === 0) return null;
  return result.docs[0];
}

export async function generatePageSlugs() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    select: {
      slug: true,
    },
  });
  return result.docs.map((doc) => ({
    slug: doc.slug as string,
  }));
}

export async function generatePageMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "pages",
    select: {
      title: true,
      description: true,
    },
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (!result.docs.length) notFound();
  const title = result.docs[0].title;
  const description = result.docs[0].description ?? "";
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
