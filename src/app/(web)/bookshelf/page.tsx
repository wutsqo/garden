import PageTitle from "@components/page-title";
import BookCard from "./components/book-card";
import { getBooks } from "./data";

const cardTilt = ["md:rotate-[-1deg]", "md:rotate-[1deg]", "md:rotate-[-0.5deg]", "md:rotate-[0.5deg]"];

export default async function Library() {
  const books = await getBooks();

  return (
    <main>
      <div className="container mx-auto px-6 pt-16">
        <div>
          <PageTitle
            title="Bookshelf"
            subtitle="The pile on my bedside table"
            subtitleProps={{ className: "text-black/70" }}
            xl
          />
        </div>
      </div>

      <div className="relative left-1/2 mt-8 w-screen max-w-[1700px] -translate-x-1/2 px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {books.map((book, i) => (
            <BookCard key={book.slug} book={book} delay={300 + i * 90} tiltClass={cardTilt[i % cardTilt.length]} />
          ))}
        </div>
      </div>
    </main>
  );
}
