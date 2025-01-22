import Image from "next/image";
import PageTitle from "@components/page-title";
import BookCard from "./components/book-card";
import LibraryHeaderImage from "@images/library.jpg";
import { getBooks } from "./data";

export default async function Library() {
  const books = await getBooks();

  return (
    <main className="relative h-screen">
      <div className="relative top-0 left-0 z-0 h-64 w-full">
        <Image src={LibraryHeaderImage} alt="Library" fill placeholder="blur" className="object-cover object-center" />
        <div className="absolute flex h-full w-full items-end bg-gradient-to-b from-transparent via-black/50 to-black">
          <div className="container mx-auto flex w-full flex-col justify-end bg-white py-6 text-black lg:rounded-t lg:px-12 lg:pt-12">
            <PageTitle title="Bookshelf" subtitle="The pile on my bedside table" xl />
          </div>
        </div>
      </div>
      <div className="container mx-auto grid w-full grid-cols-2 gap-6 rounded-b border border-t-0 border-gray-200 bg-white py-6 pb-16 sm:grid-cols-3 md:grid-cols-4 lg:gap-8 lg:px-12 lg:pb-6 xl:grid-cols-6">
        {books.map((book, i) => (
          <BookCard key={book.slug} book={book} delay={300 + i * 100} />
        ))}
      </div>
    </main>
  );
}
