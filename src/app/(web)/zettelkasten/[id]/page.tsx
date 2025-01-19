import db from "../../../../../content/notes/metadata.json";
import { notFound } from "next/navigation";
import { H1, H2, H3 } from "@components/mdx/headings";
import MdxLink from "@components/mdx/link";
import { getNotes } from "../data";
import { Notes } from "../interface";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mergeClassname as cn } from "@utils/merge-classname";
import NoteCard from "../card";
import PageTitle from "@components/page-title";

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
  const content = note.content.trim().length ? note.content : "No content yet.";

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="w-full max-w-2xl shrink-0">
        <div className={cn("prose relative mb-4 mt-8 max-w-xl prose-p:my-3")}>
          <PageTitle title={note.title} notGlowing />
          <MDXRemote source={content} components={COMPONENTS} />
          <p className="text-xs text-gray-500">
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
            <h2 className="mt-6 text-xl">Backlinks ({note.backlinks.length}):</h2>
            <div className="mt-3 grid max-w-2xl grid-cols-1 gap-4">
              {note.backlinks.map((backlink, index) => (
                <NoteCard
                  key={backlink}
                  note={db.notes[backlink as keyof typeof db.notes] as Notes}
                  seed={index}
                  bgMuted
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const generateStaticParams = () => {
  const notes = getNotes();
  return notes.map((note) => ({ id: note.id }));
};
