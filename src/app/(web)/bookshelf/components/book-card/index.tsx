import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BookCardProps } from "./index.type";
import { getImageSrc } from "@utils/images";

const BookCard: FC<BookCardProps> = async ({ book, delay }) => {
  return (
    <div
      className={"animate-fade-in relative flex flex-col opacity-0"}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <Link
        href={`/bookshelf/${book.slug}`}
        className={
          "relative aspect-2/3 w-full overflow-hidden rounded-r bg-gray-300 shadow-xl transition-transform hover:-translate-y-2"
        }
      >
        <Image
          src={getImageSrc(book.cover_image)}
          alt={`${book.title} cover`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </Link>
      <div className={"h-32"}>
        <div className={"mt-2 font-sans font-medium"}>{book.title}</div>
        <div className={"mt-1 text-sm font-light text-gray-700"}>{book.author}</div>
      </div>
    </div>
  );
};

export default BookCard;
