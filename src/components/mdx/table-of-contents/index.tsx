"use client";

import { mergeClassname } from "@utils/merge-classname";
import slugify from "@utils/slugify";
import { FC, useEffect, useState } from "react";

interface TableOfContentsProps {
  mdx: string;
}

const TableOfContents: FC<TableOfContentsProps> = ({ mdx }) => {
  const headings = mdx.match(/#{1,6} .+/g) || [];
  const toc = headings.map((heading) => {
    const level = heading.match(/#/g)?.length ?? 0;
    const text = heading.replace(/#/g, "").trim();
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
      { rootMargin: "0% 0% -80% 0%" }
    );

    document
      .querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
      .forEach((heading) => {
        observer.observe(heading);
      });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="text-gray-600 text-sm">
      <div className="font-bold uppercase">In this page:</div>
      <ul className="mt-3 flex flex-col gap-1">
        {toc.map(({ level, text }) => (
          <li key={text} className="list-inside">
            <a
              className={mergeClassname(
                "no-underline hover:text-black font-sans",
                active === slugify(text)
                  ? "text-black font-medium"
                  : "text-gray-600 font-normal"
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
