import Image from "next/image";
import { notFound } from "next/navigation";
import PageTitle from "@components/page-title";
import markdownToHtml from "@utils/markdown-to-html";
import { generatePageMetadata, generatePageSlugs, getPageData } from "./data";
import s from "./page.module.css";

export default async function Page({
  params,
}: Readonly<{
  params: {
    slug: string;
  };
}>) {
  const { slug } = params;
  const page = await getPageData(slug);
  if (!page) notFound();
  const { content, metadata } = page;
  const contentHtml = await markdownToHtml(content);

  return (
    <main className={s.wrapper}>
      <div className={s.imageWrapper}>
        {metadata?.coverImage ? (
          <Image
            src={metadata.coverImage}
            alt={metadata?.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : null}
      </div>
      <div className={s.contentWrapper}>
        <PageTitle title={metadata.title} />
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  );
}

export const generateStaticParams = generatePageSlugs;

export const generateMetadata = generatePageMetadata;
