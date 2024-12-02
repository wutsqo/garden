import fs from "fs";
import matter from "gray-matter";
import cuid2 from "@paralleldrive/cuid2";

const notesSrc = "./content/notes";

const main = async () => {
  console.log(" 🔎 Scanning and generating Ids for new notes");
  const noteFiles = fs
    .readdirSync(notesSrc)
    .filter((file) => file.endsWith(".md"));
  noteFiles.forEach((noteFile) => {
    const { data, content } = matter.read(`${notesSrc}/${noteFile}`);
    if (data.id) return;
    data.id = cuid2.createId();
    const newFileContent = matter.stringify(content, data);
    fs.writeFileSync(`${notesSrc}/${noteFile}`, newFileContent);
  });

  console.log(" 🔁 Refreshing notes metadata");
  const notes = new Map<string, any>();
  const titleToId = new Map<string, string>();
  const tagMap = new Map<string, string[]>();
  noteFiles.forEach((noteFile) => {
    const title = noteFile.replace(".md", "");
    const { data, content } = matter.read(`${notesSrc}/${noteFile}`);
    const { id } = data;
    titleToId.set(title, id);
    data.tags.forEach((tag: string) => {
      if (!tagMap.has(tag)) tagMap.set(tag, []);
      tagMap.get(tag)!.push(id);
    });
    notes.set(id, { title, ...data, content, backlinks: [] });
  });

  console.log(" 📝 Generating custom note for each tags");
  tagMap.forEach((noteIds, tagName) => {
    const tagNote = {
      id: `tag-${tagName}`,
      title: `Tagged with #${tagName}`,
      tags: [],
      content: "\n",
      backlinks: [],
      updated: new Date().toISOString(),
      isCollection: true,
    };
    noteIds.forEach((noteId) => {
      tagNote.content += `- [[${notes.get(noteId).title}]]\n`;
    });
    notes.set(tagNote.id, tagNote);
  });

  console.log(" 🔗 Generating backlinks");
  notes.forEach((note) => {
    const backlinks = new Set();
    const regex = /\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = regex.exec(note.content))) {
      const reference = match[1];
      backlinks.add(titleToId.get(reference));
      notes.get(titleToId.get(reference)!).backlinks.push(note.id);
      note.content = note.content.replace(
        new RegExp(`\\[\\[${reference}\\]\\]`, "g"),
        `[${reference}](/zettelkasten/${titleToId.get(reference)})`
      );
    }
  });

  fs.writeFileSync(
    `${notesSrc}/metadata.json`,
    JSON.stringify({
      notes: Array.from(notes.entries()).reduce((acc, [id, note]) => {
        acc[id] = note;
        return acc;
      }, {} as Record<string, any>),
      tags: Array.from(tagMap.entries()).reduce((acc, [tag, notes]) => {
        acc[tag] = notes;
        return acc;
      }, {} as Record<string, string[]>),
    })
  );
  console.log(" ✅ Notes metadata refreshed.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
