import PageTitle from "@components/page-title";
import markdownToHtml from "@utils/markdown-to-html";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";
import s from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Services({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const document = getDocumentBySlug("pages", params.slug, [
    "title",
    "subtitle",
    "publishedAt",
    "content",
    "coverImage",
  ]);

  if (!document) {
    return notFound();
  }

  const content = await markdownToHtml(document?.content ?? "");

  return (
    <main className={s.wrapper}>
      <div className={s.imageWrapper}>
        {document?.coverImage ? (
          <Image
            src={document?.coverImage ?? ""}
            alt={document?.title ?? ""}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : null}
      </div>
      <div className={s.contentWrapper}>
        <PageTitle
          title={document?.title ?? ""}
          subtitle={document?.subtitle as string | undefined}
        />
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = getDocumentSlugs("pages");
  return slugs.map((slug) => ({
    params: {
      slug: slug,
    },
  }));
}
