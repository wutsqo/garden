import { Notes } from "./interface";
import db from "../../../../content/notes/metadata.json";

export const getNotes = () => {
  const notes = Object.keys(db.notes).map(
    (id) => db.notes[id as keyof typeof db.notes]
  ) as Notes[];
  const sortedNotes = notes
    .filter((note) => !note.isCollection)
    .sort((a, b) => a.title.localeCompare(b.title));
  return sortedNotes;
};
