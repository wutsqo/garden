"use client";

import { Book } from "@/payload.types";
import RichText from "@components/rich-text";
import { FC, useState } from "react";

interface Props {
  book: Partial<Book>;
}

const BookDescription: FC<Props> = ({ book }) => {
  const [truncated, setTruncated] = useState(true);
  if (!book.sinopsis) return null;
  return (
    <article
      className="prose relative overflow-hidden"
      style={{
        height: truncated ? "20rem" : "auto",
      }}
    >
      <h2 className="border-bluish-purple mt-8 border-l-4 pl-2">Description</h2>
      <RichText data={book.sinopsis} />
      {truncated && (
        <button
          onClick={() => setTruncated(false)}
          className="absolute bottom-0 left-0 flex h-20 w-full cursor-pointer items-end bg-linear-to-b from-transparent via-white to-white text-left text-black underline"
        >
          <span>Read more</span>
        </button>
      )}
    </article>
  );
};

export default BookDescription;
