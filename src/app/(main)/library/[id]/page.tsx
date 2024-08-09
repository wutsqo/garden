import Image from "next/image";
import s from "./page.module.css";
import { getBook, getBookStaticPaths } from "@services/books";
import PageTitle, { PageTitleVariant } from "@components/page-title";

export default async function BookDetail({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  const book = await getBook(params.id);

  return (
    <main className={s.wrapper}>
      <div className={s.imageWrapper}>
        <Image src={book.cover} alt="Library" fill />
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
        <div
          className={s.booksWrapper}
          dangerouslySetInnerHTML={{
            __html: book.body ?? "",
          }}
        />
      </div>
    </main>
  );
}

export const generateStaticParams = getBookStaticPaths;
