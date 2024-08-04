import { FC } from "react";
import s from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { Book } from "./interface";
import { mergeClassname } from "@utils/merge-classname";

const BookCard: FC<Book> = (book) => {
  return (
    <div className={s.book}>
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
