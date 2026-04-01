import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BookCardProps } from "./index.type";
import { getImageSrc } from "@utils/images";
import { Book } from "@/payload.types";

const statusLabelMap: Record<NonNullable<Book["status"]>, string> = {
  tbr: "To Be Read",
  reading: "Reading",
  read: "Finished",
};

const statusClassMap: Record<NonNullable<Book["status"]>, string> = {
  tbr: "border-yellow-beer/70 bg-yellow-beer/20",
  reading: "border-twitter-blue/70 bg-twitter-blue/15",
  read: "border-green-carribean/70 bg-green-carribean/20",
};

const BookCard: FC<BookCardProps> = async ({ book, delay, tiltClass = "" }) => {
  return (
    <div
      className="animate-fade-in relative flex flex-col opacity-0"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <Link
        href={`/bookshelf/${book.slug}`}
        className={`shadow-brutalist group block overflow-hidden rounded border border-black bg-white transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${tiltClass}`}
      >
        <div className="relative aspect-2/3 w-full overflow-hidden border-b border-black bg-gray-200">
          <Image
            src={getImageSrc({ img: book.cover_image })}
            alt={`${book.title} cover`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-1.5 p-2.5">
          {book.status ? (
            <div
              className={`inline-flex max-w-max rounded border px-2 py-0.5 text-xs font-medium tracking-wide uppercase ${statusClassMap[book.status]}`}
            >
              {statusLabelMap[book.status]}
            </div>
          ) : null}

          <h3 className="line-clamp-2 font-sans text-sm leading-snug font-medium text-black">{book.title}</h3>
          <p className="line-clamp-1 text-xs text-black/70">{book.author}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
