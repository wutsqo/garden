import { FC } from "react";
import { Notes } from "./interface";
import Link from "next/link";
import { mergeClassname as cn } from "@utils/merge-classname";
import {
  backgroudColors,
  beforeBorderLeftColors,
  borderLeftColors,
  mutedBackgroudColors,
} from "./utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { H1, H2, H3, H4, H5, H6 } from "@components/mdx/headings";
import MdxLink from "@components/mdx/link";
const COMPONENTS = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: MdxLink,
};

interface Props {
  note: Notes;
  seed: number;
  bgMuted?: boolean;
}

const NoteCard: FC<Props> = ({ note, seed, bgMuted }) => {
  const index = seed % backgroudColors.length;

  return (
    <div
      className={cn(
        !bgMuted ? backgroudColors[index] : mutedBackgroudColors[index],
        beforeBorderLeftColors[index],
        borderLeftColors[index],
        "border-l-2 mb-4 break-inside-avoid p-4 relative",
        "before:content-[''] before:absolute before:bottom-0 before:right-0",
        "before:w-0 before:h-0",
        "before:border-l-[20px] ",
        "before:border-b-[20px] before:border-b-transparent",
        "after:content-[''] after:absolute after:bottom-0 after:right-0",
        "after:w-0 after:h-0",
        "after:border-l-[18px] after:border-l-transparent",
        "after:border-b-[18px]",
        "after:border-b-white"
      )}
    >
      <div className="prose prose-sm">
        <h2 className="text-lg ">
          <Link
            prefetch
            href={`/zettelkasten/${note.id}`}
            className="md:no-underline hover:underline"
          >
            {note.title}
          </Link>
        </h2>
        {note.isCollection ? (
          <MDXRemote source={note.content} components={COMPONENTS} />
        ) : null}
        <div>
          {note.tags.map((tag) => (
            <Link
              prefetch
              href={`/zettelkasten/tag-${tag}`}
              key={tag}
              className="no-underline hover:underline text-gray-700 mr-2"
            >
              #{tag}{" "}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
