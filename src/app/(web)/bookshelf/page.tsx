import PageTitle from "@components/page-title";
import BookCard from "./components/book-card";
import { getBooks } from "./data";

export default async function Library() {
  const books = await getBooks();

  return (
    <main>
      <div className="bg-white/10 py-16 text-white backdrop-invert">
        <div className="container mx-auto flex w-full flex-col justify-end px-6 py-6 text-black lg:rounded-t lg:px-12 lg:pt-12">
          <PageTitle
            title="Bookshelf"
            subtitle="The pile on my bedside table"
            subtitleProps={{ className: "text-white" }}
            xl
          />
        </div>
      </div>
      <div className="container mx-auto mt-12 grid w-full grid-cols-2 gap-6 rounded-b px-6 py-6 pb-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-8 lg:px-12 lg:pb-6 xl:grid-cols-5">
        {books.map((book, i) => (
          <BookCard key={book.slug} book={book} delay={300 + i * 100} />
        ))}
      </div>
    </main>
  );
}
