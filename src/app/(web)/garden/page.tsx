import Link from "next/link";
import PageTitle from "@components/page-title";
import { getNotes } from "./data";

export default function Page() {
  const notes = getNotes();

  return (
    <>
      <PageTitle
        title="Digital Garden"
        subtitle="A collection of notes and half-baked explorations."
        xl
      />
      <main className="grid grid-cols-1 gap-2 mt-6 border-t border-gray-200 pt-2 pb-8">
        {notes.map((note) => (
          <div key={note.id} className="border-b border-gray-200 pb-2">
            <h2 className="text-lg hover:underline">
              <Link prefetch href={`/garden/${note.id}`}>
                {note.title}
              </Link>
            </h2>
          </div>
        ))}
      </main>
    </>
  );
}
