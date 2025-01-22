import { notFound } from "next/navigation";
import { generatePageMetadata, generatePageSlugs, getPageData } from "./data";
import { MDXRemote } from "next-mdx-remote/rsc";
import TableOfContents from "@components/mdx/table-of-contents";
import { H1, H2, H3, H4, H5, H6 } from "@components/mdx/headings";
import { Params } from "./interface";
import ProjectForm from "@components/project-form";

const COMPONENTS = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ProjectForm,
};

export default async function Page({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { slug } = await params;
  const page = await getPageData(slug);
  if (!page) notFound();
  const { content, metadata } = page;

  return (
    <main className="bg-white">
      <div className="bg-green-carribean/50 w-full border-b-2 border-black py-24">
        <div className="container mx-auto px-6">
          <div className="prose sm:prose-lg max-w-5xl">
            <h1 className="text-5xl sm:text-7xl" style={{ marginBottom: 0 }}>
              {metadata.title}
            </h1>
            <p className="text-xl sm:text-2xl" style={{ marginTop: "1em" }}>
              {metadata.description}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-x-40 gap-y-20 py-20 lg:flex-row">
          <div className="max-w-xl shrink-0 self-start lg:sticky lg:top-28">
            <TableOfContents mdx={content} />
          </div>
          <div className="prose sm:prose-lg max-w-xl font-sans">
            <MDXRemote source={content} components={COMPONENTS} />
          </div>
        </div>
      </div>
    </main>
  );
}

export const generateStaticParams = generatePageSlugs;

export const generateMetadata = generatePageMetadata;
