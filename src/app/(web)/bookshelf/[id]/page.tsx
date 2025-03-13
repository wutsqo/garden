import { generateBookSlugs, getBookBySlug } from "../data";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageTitle from "@components/page-title";
import { getImageSrc } from "@utils/images";
import BookDescription from "./description";
import Timeline from "./timeline";
import { Book, BookTimeline } from "@/payload.types";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

type Params = Promise<{
  id: string;
}>;

const statusLabelMap: Record<NonNullable<Book["status"]>, string> = {
  tbr: "To Be Read",
  reading: "Reading",
  read: "Finished Reading",
};

export default async function BookDetail({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { id } = await params;
  const book = await getBookBySlug(id);
  if (!book) notFound();

  return (
    <>
      <div className="flex w-full flex-col gap-6 bg-white/10 text-white backdrop-invert">
        <div className="container mx-auto grid max-w-screen-lg auto-cols-min grid-cols-1 gap-6 px-6 pt-16 pb-12 sm:grid-cols-3 lg:px-12">
          <div className="self-end sm:col-span-2">
            <PageTitle title={book.title} subtitle={`By ${book.author}`} xl />
          </div>
          <div className="flex w-full items-center justify-start sm:row-span-2 sm:justify-end sm:py-12">
            <figure className="relative aspect-2/3 h-auto w-full max-w-48 overflow-hidden rounded-r">
              <Image
                src={getImageSrc({ img: book.cover_image })}
                alt="Library"
                fill
                className="object-cover object-center"
              />
            </figure>
          </div>
          <div className="sm:col-span-2">
            {book.status && (
              <div className="mt-4 max-w-96 rounded border border-gray-200 py-2 text-center capitalize">
                Status: {statusLabelMap[book.status]}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto max-w-screen-lg border border-t-0 border-gray-200 bg-white p-6 pb-16 lg:px-12">
        <div className="flex w-full flex-col gap-8">
          <BookDescription book={book} />
          <Timeline timelines={book.timeline as BookTimeline[]} />
        </div>
      </div>
      <Link
        href="/bookshelf"
        className="group container mx-auto flex w-full max-w-screen-lg items-center justify-center border-x border-gray-200 bg-white py-24 hover:bg-gray-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e7eb' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex max-w-72 items-end gap-4">
          <MoveLeft size={40} stroke="currentColor" className="duration-300 group-hover:-translate-x-4" />
          <div>
            <div className="pl-0.5">Back to</div>
            <div className="text-4xl">Bookshelf</div>
          </div>
        </div>
      </Link>
    </>
  );
}

export const generateStaticParams = generateBookSlugs;
