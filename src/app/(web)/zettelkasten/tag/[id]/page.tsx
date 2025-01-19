import db from "@content/notes/metadata.json";
import { notFound } from "next/navigation";
import { Notes } from "../../interface";
import PageTitle from "@components/page-title";
import NoteCard from "../../card";
import Breadcrumb from "@components/breadcrumb";

type Params = Promise<{
  id: string;
}>;

export default async function NoteDetail({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { id } = await params;
  const noteIds = db.tags[id as keyof typeof db.tags];
  if (!noteIds?.length) notFound();
  const notes = noteIds.map(
    (id) => db.notes[id as keyof typeof db.notes]
  ) as Notes[];
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Zettelkasten", path: "/zettelkasten" },
          { label: "Tags" },
          { label: id, path: `/zettelkasten/tag/${id}` },
        ]}
      />
      <PageTitle
        title="Zettelkasten"
        subtitle={`Notes tagged with ${id} (${notes.length}).`}
      />
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 pt-2 pb-8">
        {notes.map((note, i) => (
          <NoteCard note={note} key={note.id} seed={i} />
        ))}
      </main>
    </>
  );
}
