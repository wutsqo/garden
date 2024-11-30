import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import s from "./index.module.css";
import { BookCardProps } from "./index.type";

const BookCard: FC<BookCardProps> = async ({ book, delay }) => {
  return (
    <div
      className={s.book}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <Link href={`/bookshelf/${book.slug}`} className={s.cover}>
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
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
