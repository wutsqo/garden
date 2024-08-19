import { generateBookSlugs } from "../data";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageTitle, { PageTitleVariant } from "@components/page-title";
import getImage from "@utils/get-image";
import markdownToHtml from "@utils/markdown-to-html";
import { getBookBySlug } from "./data";
import s from "./page.module.css";

export default async function BookDetail({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  const document = await getBookBySlug(params.id);
  if (!document) notFound();
  const book = document.metadata;
  const { color, img } = await getImage(book.cover);
  const content = await markdownToHtml(book.body);

  return (
    <main className={s.wrapper}>
      <div className={s.imageWrapper} style={{ backgroundColor: color.hex }}>
        <Image src={img.src} alt="Library" fill />
        <div className={s.imageOverlay}>
          <div className={s.titleWrapper}>
            <PageTitle
              title={book.title}
              subtitle={`By ${book.author}`}
              variant={PageTitleVariant.WhiteBeforeLg}
            />
          </div>
          <div className={s.contentWrapper}>
            <div
              className={s.detailWrapper}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export const generateStaticParams = generateBookSlugs;
