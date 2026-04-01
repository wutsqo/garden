import Button from "@components/button";
import { getImageSrc } from "@utils/images";
import type { Book } from "@/payload.types";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import SectionTitle from "../components/section-title";

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

const cardTilt = ["md:rotate-[-1deg]", "md:rotate-[1deg]", "md:rotate-[-0.5deg]", "md:rotate-[0.5deg]"];

export default async function Bookshelf() {
  const payload = await getPayload({ config });
  const books = await payload.find({
    collection: "books",
    select: {
      title: true,
      author: true,
      slug: true,
      cover_image: true,
      status: true,
    },
    sort: ["-updatedAt"],
    limit: 8,
  });

  if (!books.docs.length) return null;

  return (
    <section className="container mx-auto mt-24 px-6">
      <SectionTitle number="📚" title="Bookshelf" />
      <div className="-mt-8">
        <p className="max-w-2xl text-sm leading-relaxed text-black sm:text-base">
          A messy, living shelf of books I keep circling back to.
        </p>
      </div>

      <div className="relative left-1/2 mt-8 w-screen max-w-[1700px] -translate-x-1/2 px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {books.docs.map((book, index) => {
            const status = book.status;
            const tilt = cardTilt[index % cardTilt.length];

            return (
              <article
                key={book.id}
                style={{ animationDelay: `${150 + index * 90}ms` }}
                className="animate-fade-in opacity-0"
              >
                <Link
                  href={`/bookshelf/${book.slug}`}
                  className={`shadow-brutalist group block overflow-hidden rounded border border-black bg-white transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${tilt}`}
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
                    {status ? (
                      <div
                        className={`inline-flex max-w-max rounded border px-2 py-0.5 text-xs font-medium tracking-wide uppercase ${statusClassMap[status]}`}
                      >
                        {statusLabelMap[status]}
                      </div>
                    ) : null}

                    <h3 className="line-clamp-2 font-sans text-sm leading-snug font-medium text-black">{book.title}</h3>
                    <p className="line-clamp-1 text-xs text-black/70">{book.author}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center sm:justify-start">
        <Button href="/bookshelf" className="w-full sm:w-auto">
          See Full Bookshelf
        </Button>
      </div>
    </section>
  );
}
