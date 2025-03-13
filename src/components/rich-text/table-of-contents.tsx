"use client";

import { SerializedHeadingNode } from "@payloadcms/richtext-lexical";
import { SerializedEditorState, SerializedTextNode } from "@payloadcms/richtext-lexical/lexical";
import { mergeClassname } from "@utils/merge-classname";
import slugify from "@utils/slugify";
import { FC, useEffect, useState } from "react";

interface TableOfContentsProps {
  data: SerializedEditorState;
}

const TableOfContents: FC<TableOfContentsProps> = ({ data }) => {
  const headings = data.root.children.filter((node) => node.type === "heading") as SerializedHeadingNode[];
  const toc = headings.map((heading) => {
    const level = heading.tag[1];
    const text = (heading.children as SerializedTextNode[]).map((child) => child.text).join("");
    return { level, text };
  });
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="text-sm text-gray-600">
      <div className="font-bold uppercase">In this page:</div>
      <ul className="mt-3 flex flex-col gap-1">
        {toc.map(({ level, text }) => (
          <li key={text} className="list-inside">
            <a
              className={mergeClassname(
                "font-sans no-underline hover:text-black",
                active === slugify(text) ? "font-medium text-black" : "font-normal text-gray-600",
              )}
              href={`#${slugify(text)}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
