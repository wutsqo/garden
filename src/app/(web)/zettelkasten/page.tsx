import PageTitle from "@components/page-title";
import { getNotes } from "./data";
import NoteCard from "./card";

export default function Page() {
  const rawNotes = getNotes();
  const notes = rawNotes.map((note) => ({
    ...note,
    content: note.content.trim() ?? "No content yet.",
  }));

  return (
    <>
      <PageTitle title="Zettelkasten" subtitle={`A collection of notes, ideas, and thoughts (${notes.length}).`} xl />
      <main className="mt-6 grid max-w-md grid-cols-1 pb-8">
        {notes.map((note, i) => (
          <NoteCard note={note} key={note.id} seed={i} />
        ))}
      </main>
    </>
  );
}
