import Image from "next/image";
import s from "./page.module.css";
import { getBook, getBookStaticPaths } from "@services/books";
import PageTitle, { PageTitleVariant } from "@components/page-title";
import getImage from "@utils/get-image";
import markdownToHtml from "@utils/markdown-to-html";

export default async function BookDetail({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  const book = await getBook(params.id);
  const { color, img } = await getImage(book.cover);
  const content = await markdownToHtml(book.body);

  return (
    <main className={s.wrapper}>
      <div className={s.imageWrapper} style={{ backgroundColor: color.hex }}>
        <Image src={img.src} alt="Library" fill />
        <div className={s.imageOverlay} />
      </div>
      <div className={s.contentWrapper}>
        <div className={s.titleWrapper}>
          <PageTitle
            title={book.title}
            subtitle={`By ${book.author}`}
            variant={PageTitleVariant.WhiteBeforeLg}
          />
        </div>
        <hr />
        <div
          className={s.detailWrapper}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </main>
  );
}

export const generateStaticParams = getBookStaticPaths;
