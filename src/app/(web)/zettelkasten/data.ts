import { Notes } from "./interface";
import db from "../../../../content/notes/metadata.json";

export const getNotes = () => {
  const notes = Object.keys(db.notes).map(
    (id) => db.notes[id as keyof typeof db.notes]
  ) as Notes[];
  const sortedNotes = notes
    .map((note) => ({
      ...note,
      title: note.title.replace("Collection: ", ""),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
  return sortedNotes;
};
