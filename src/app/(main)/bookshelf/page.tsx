import s from "./page.module.css";
import PageTitle, { PageTitleVariant } from "@components/page-title";
import BookCard from "../../../components/book-card";
import Image from "next/image";
import LibraryHeaderImage from "@images/library.jpg";
import { getBooks } from "@services/books";

export default async function Library() {
  const books = await getBooks();

  return (
    <main className={s.wrapper}>
      <div className={s.imageWrapper}>
        <Image src={LibraryHeaderImage} alt="Library" fill placeholder="blur" />
        <div className={s.imageOverlay}>
          <div className={s.titleWrapper}>
            <PageTitle
              title="Bookshelf 📚"
              subtitle="The pile on my bedside table"
              variant={PageTitleVariant.WhiteBeforeLg}
            />
          </div>
        </div>
      </div>
      <div className={s.contentWrapper}>
        <div className={s.booksWrapper}>
          {books.map((book, i) => (
            <BookCard key={book.id} book={book} delay={300 + i * 100} />
          ))}
        </div>
      </div>
    </main>
  );
}
