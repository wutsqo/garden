import db from "../../../../../content/notes/metadata.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { H1, H2, H3 } from "@components/mdx/headings";
import MdxLink from "@components/mdx/link";
import PageTitle from "@components/page-title";
import { getNotes } from "../data";
import { Notes } from "../interface";

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
    <main className="prose pb-8">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/zettelkasten" className="hover:text-gray-700">
          <span className="hidden sm:inline">Zettelkasten</span>
        </Link>
        <span>/</span>
        <span className="truncate">{note.title}</span>
      </div>
      <div className="mt-4">
        <PageTitle title={note.title} notGlowing />
      </div>
      <MDXRemote source={content} components={COMPONENTS} />
      <p className="text-gray-500 text-sm">
        Last Updated:{" "}
        {new Date(note.updated).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {note.backlinks.length > 0 && (
        <>
          <h2>Other notes mentioning this note ({note.backlinks.length}):</h2>
          <ul>
            {note.backlinks.map((backlink) => (
              <li key={backlink}>
                <Link prefetch href={`/zettelkasten/${backlink}`}>
                  {db.notes[backlink as keyof typeof db.notes].title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export const generateStaticParams = () => {
  const notes = getNotes();
  return notes.map((note) => ({ id: note.id }));
};
