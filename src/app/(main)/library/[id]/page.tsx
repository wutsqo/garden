import Image from "next/image";
import s from "./page.module.css";
import { getBook, getBookSlugs } from "../data";

export default async function BookDetail({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  const data = await getBook(params.id);

  return (
    <div className={s.wrapper}>
      <div className={s.imageWrapper}>
        <Image
          src={data.cover}
          alt={data.title}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div className={s.overlay}>
          <div className={s.info}>
            <div className={s.title}>{data.title}</div>
            <div className={s.author}>{data.author}</div>
          </div>
        </div>
      </div>
      <div className={s.contentWrapper}>
        <div
          className={s.content}
          dangerouslySetInnerHTML={{
            __html: data.body ?? "",
          }}
        ></div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getBookSlugs();
  return slugs.map((slug) => ({
    params: {
      id: slug,
    },
  }));
}
