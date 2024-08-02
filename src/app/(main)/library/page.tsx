import s from "./style.module.css";
import PageTitle from "@components/page-title";
import { getBooks } from "./data";
import BookCard from "./book-card";

export default async function Library() {
  const books = await getBooks();

  return (
    <main className={s.wrapper}>
      <PageTitle
        title="Library 📚"
        subtitle="A collection of books that I have read, am reading, or want to read."
      />
      <div className={s.books}>
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </main>
  );
}
