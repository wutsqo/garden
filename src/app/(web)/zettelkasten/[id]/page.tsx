import db from "../../../../../content/notes/metadata.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import { H1, H2, H3 } from "@components/mdx/headings";
import MdxLink from "@components/mdx/link";
import { getNotes } from "../data";
import { Notes } from "../interface";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mergeClassname as cn } from "@utils/merge-classname";
import NoteCard from "../card";

type Params = Promise<{
  id: string;
}>;

const COMPONENTS = {
  h1: H1,
  h2: H2,
  h3: H3,
  a: MdxLink,
};

export default async function NoteDetail({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { id } = await params;
  const note = db.notes[id as keyof typeof db.notes] as Notes;
  if (!note) notFound();
  const content =
    note.content.trim().length > 0 ? note.content : "No content yet.";

  return (
    <div className="pb-8">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/zettelkasten" className="hover:text-gray-700">
          Zettelkasten
        </Link>
        <span>/</span>
        <span className="truncate">{note.title}</span>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full max-w-2xl shrink-0">
          <div className={cn("mb-4 relative mt-8 prose prose-p:my-3 max-w-xl")}>
            <h1 className="font-medium text-3xl">{note.title}</h1>
            <MDXRemote source={content} components={COMPONENTS} />
            <div>
              {note.tags.map((tag) => (
                <Link
                  prefetch
                  href={`/zettelkasten/tag-${tag}`}
                  key={tag}
                  className="no-underline hover:underline text-gray-600 mr-1.5 mt-4"
                >
                  #{tag}{" "}
                </Link>
              ))}
            </div>
            <p className="text-gray-500 text-xs">
              Last Updated:{" "}
              {new Date(note.updated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="w-full">
          {note.backlinks.length > 0 && (
            <>
              <h2 className="text-xl mt-6">
                Other notes mentioning this note ({note.backlinks.length}):
              </h2>
              <div className="mt-3 max-w-2xl">
                {note.backlinks.map((backlink, index) => (
                  <div key={backlink}>
                    <NoteCard
                      note={
                        db.notes[backlink as keyof typeof db.notes] as Notes
                      }
                      seed={index}
                      bgMuted
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const generateStaticParams = () => {
  const notes = getNotes();
  return notes.map((note) => ({ id: note.id }));
};
