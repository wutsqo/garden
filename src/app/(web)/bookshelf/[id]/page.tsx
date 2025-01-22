import { generateBookSlugs, getBookBySlug } from "../data";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageTitle from "@components/page-title";
import { getImageSrc } from "@utils/images";
import BookDescription from "./description";
import Timeline from "./timeline";
import { BookTimeline } from "@/payload.types";

type Params = Promise<{
  id: string;
}>;

export default async function BookDetail({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { id } = await params;
  const book = await getBookBySlug(id);
  if (!book) notFound();

  return (
    <div className="bg-white pt-20 lg:bg-transparent">
      <div className="absolute top-0 z-0 h-80 w-full">
        <Image src={getImageSrc(book.cover_image)} alt="Library" fill className="object-cover object-center" />
        <div className="absolute flex h-full w-full bg-white/50 backdrop-blur-3xl"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 rounded border border-gray-200 bg-white p-6 lg:p-12">
        <div className="flex w-full flex-col gap-8 sm:flex-row">
          <div className="w-full max-w-56 shrink-0 self-start">
            <figure className="relative aspect-2/3 h-auto w-full overflow-hidden rounded-r shadow-sm">
              <Image src={getImageSrc(book.cover_image)} alt="Library" fill className="object-cover object-center" />
            </figure>
            <div className="mt-4 rounded border border-gray-200 py-2 text-center capitalize">Status: {book.status}</div>
          </div>
          <div>
            <PageTitle title={book.title} subtitle={`By ${book.author}`} />
            <BookDescription book={book} />
            <Timeline timelines={book.timeline as BookTimeline[]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const generateStaticParams = generateBookSlugs;
