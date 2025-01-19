import { FC } from "react";
import { Notes } from "./interface";
import Link from "next/link";
import { mergeClassname as cn } from "@utils/merge-classname";
import { backgroudColors, beforeBorderLeftColors, borderLeftColors, mutedBackgroudColors } from "./utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
// import { serialize } from "next-mdx-remote/serialize";
// import { MDXRemote } from "next-mdx-remote";

interface Props {
  note: Notes;
  seed: number;
  bgMuted?: boolean;
}

const NoteCard: FC<Props> = async ({ note, seed, bgMuted }) => {
  const index = seed % backgroudColors.length;
  const href = note.isCollection ? `/zettelkasten/tag/${note.id}` : `/zettelkasten/${note.id}`;
  // const mdxSource = await serialize(note.content.trim() ?? "No content yet.");

  return (
    <Tooltip placement="right">
      <TooltipTrigger asChild>
        <Link
          prefetch
          href={href}
          className={cn(
            !bgMuted ? backgroudColors[index] : mutedBackgroudColors[index],
            beforeBorderLeftColors[index],
            borderLeftColors[index],
            "group relative block border-l-2 p-4",
          )}
        >
          <div className="prose prose-sm">
            <h2 className="text-lg font-medium">{note.title}</h2>
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="relative z-10 rounded border border-black bg-white p-4 shadow-xl">
        <div className="prose prose-sm">
          {/* <MDXRemote {...mdxSource} lazy /> */}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default NoteCard;
