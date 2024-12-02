const fs = require("fs");

const notesSrc = "./content/notes";

const main = async () => {
  console.log(" 🔁 Refreshing notes metadata");
  const noteFiles = fs
    .readdirSync(notesSrc)
    .filter((file) => file.endsWith(".md"));
  const notes = new Map();
  const titleToId = new Map();
  const tagMap = new Map();
  noteFiles.forEach((noteFile) => {
    const noteContent = fs.readFileSync(`${notesSrc}/${noteFile}`, "utf-8");
    const title = noteFile.replace(".md", "");
    const { data, content } = require("gray-matter")(noteContent);
    const { id } = data;
    titleToId.set(title, id);
    data.tags.forEach((tag) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }
      tagMap.get(tag).push(id);
    });
    notes.set(id, { title, ...data, content, backlinks: [] });
  });

  console.log(" 📝 Generating custom note for each tags");
  tagMap.forEach((noteIds, tagName) => {
    const tagNote = {
      id: tagName,
      title: `Collection: ${tagName}`,
      tags: [],
      content: "Some notes in this collection:\n",
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
      notes.get(titleToId.get(reference)).backlinks.push(note.id);
      note.content = note.content.replace(
        new RegExp(`\\[\\[${reference}\\]\\]`, "g"),
        `[${reference}](/garden/${titleToId.get(reference)})`
      );
    }
  });

  fs.writeFileSync(
    `${notesSrc}/metadata.json`,
    JSON.stringify({
      notes: Array.from(notes.entries()).reduce((acc, [id, note]) => {
        acc[id] = note;
        return acc;
      }, {}),
      tags: Array.from(tagMap.entries()).reduce((acc, [tag, notes]) => {
        acc[tag] = notes;
        return acc;
      }, {}),
    })
  );
  console.log(" ✅ Notes metadata refreshed.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
