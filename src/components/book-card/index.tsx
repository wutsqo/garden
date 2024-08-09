import { FC } from "react";
import s from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { mergeClassname } from "@utils/merge-classname";
import { BookCardProps } from "./index.type";

const BookCard: FC<BookCardProps> = ({ book, delay }) => {
  return (
    <div
      className={s.book}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <Link href={`/library/${book.id}`} className={s.cover}>
        <Image
          src={book.cover}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </Link>
      <div className={mergeClassname(s.status, s[book.status])}>
        {book.status}
      </div>
      <div className={s.info}>
        <div className={s.title}>{book.title}</div>
        <div className={s.author}>{book.author}</div>
      </div>
    </div>
  );
};

export default BookCard;
