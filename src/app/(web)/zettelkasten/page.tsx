import PageTitle from "@components/page-title";
import { getNotes } from "./data";
import NoteCard from "./card";

export default function Page() {
  const notes = getNotes();

  return (
    <>
      <PageTitle
        title="Zettelkasten"
        subtitle={`A collection of notes, ideas, and thoughts (${notes.length}).`}
        xl
      />
      <main className="columns-1 md:columns-2 xl:columns-3 gap-4 mt-6 pt-2 pb-8">
        {notes.map((note, i) => (
          <NoteCard note={note} key={note.id} seed={i} />
        ))}
      </main>
    </>
  );
}
