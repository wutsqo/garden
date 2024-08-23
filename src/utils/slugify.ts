export default function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/ /g, "-");
}
