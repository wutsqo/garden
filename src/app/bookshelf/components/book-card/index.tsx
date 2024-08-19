import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import getImage from "@utils/get-image";
import s from "./index.module.css";
import { BookCardProps } from "./index.type";

const BookCard: FC<BookCardProps> = async ({ book, delay }) => {
  const { base64, img } = await getImage(book.cover);

  return (
    <div
      className={s.book}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <Link href={`/bookshelf/${book.slug}`} className={s.cover}>
        <Image
          src={img.src}
          alt={`${book.title} cover`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={base64}
        />
      </Link>
      <div className={s.info}>
        <div className={s.title}>{book.title}</div>
        <div className={s.author}>{book.author}</div>
      </div>
    </div>
  );
};

export default BookCard;
