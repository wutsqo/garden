import { notFound } from "next/navigation";
import { generatePageMetadata, generatePageSlugs, getPageData } from "./data";
import { Params } from "./interface";
import RichText from "@components/rich-text";
import TableOfContents from "@components/rich-text/table-of-contents";

export default async function Page({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { slug } = await params;
  const page = await getPageData(slug);
  if (!page) notFound();
  const { content, title, description } = page;

  return (
    <main className="bg-white">
      <div className="bg-green-carribean/50 w-full border-b-2 border-black py-24">
        <div className="container mx-auto px-6">
          <div className="prose sm:prose-lg max-w-5xl">
            <h1 className="text-5xl sm:text-7xl" style={{ marginBottom: 0 }}>
              {title}
            </h1>
            <p className="text-xl sm:text-2xl" style={{ marginTop: "1em" }}>
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-x-40 gap-y-20 py-20 lg:flex-row">
          <div className="max-w-xl shrink-0 self-start lg:sticky lg:top-28">
            {content && <TableOfContents data={content} />}
          </div>
          <div className="prose sm:prose-lg max-w-xl font-sans">{content && <RichText data={content} />}</div>
        </div>
      </div>
    </main>
  );
}

export const generateStaticParams = generatePageSlugs;

export const generateMetadata = generatePageMetadata;
