import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { buildConfig } from "payload";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { Books } from "./src/collections/books";
import { Media } from "./src/collections/media";
import { BookTimelines } from "@/collections/book-timelines";
import { Pages } from "@/collections/pages";
import { TechStacks } from "@/collections/tech-stacks";
import { Projects } from "@/collections/projects";
import { Teammates } from "@/collections/teammates";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Books, Media, BookTimelines, Pages, TechStacks, Projects, Teammates],
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    idType: "uuid",
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(process.cwd(), "src/payload.types.ts"),
  },
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: {
          generateFileURL: (file) => `https://udp2pzttbkr67gqz.public.blob.vercel-storage.com/${file.filename}`,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
