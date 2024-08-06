import PageTitle from "@components/page-title";
import markdownToHtml from "@utils/markdown-to-html";
import s from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPageData, getPageMetadata, getPageSlugs } from "./data";

export default async function Page({
  params,
}: Readonly<{
  params: {
    slug: string;
  };
}>) {
  const { slug } = params;
  const data = await getPageData(slug);

  if (!data) notFound();

  const content = await markdownToHtml(data?.content ?? "");

  return (
    <main className={s.wrapper}>
      <div className={s.imageWrapper}>
        {data?.coverImage ? (
          <Image
            src={data?.coverImage ?? ""}
            alt={data?.title ?? ""}
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
          title={data?.title ?? ""}
          subtitle={data?.subtitle as string | undefined}
        />
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
}

export const generateStaticParams = getPageSlugs;

export const generateMetadata = getPageMetadata;
