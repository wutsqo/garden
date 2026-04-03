"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Homepage } from "@/payload.types";
import { getImageSrc } from "@utils/images";
import Button from "@components/button";

type EmploymentEntry = NonNullable<Homepage["employmentHistory"]>[number];

interface Props {
  employmentHistory: NonNullable<Homepage["employmentHistory"]>;
}

function EmploymentCard({ entry, index }: { entry: EmploymentEntry; index: number }) {
  const hasLogo = Boolean(entry.logo);

  return (
    <article
      key={`${entry.company}-${entry.role}-${entry.period}-${index}`}
      className="flex flex-row items-start gap-6"
    >
      <div aria-hidden="true" className="relative flex max-w-fit justify-start pt-5 sm:pt-6">
        <div className="bg-green-carribean shadow-brutalist relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-black">
          <span className="h-1 w-1 rounded-full bg-black" />
        </div>
      </div>

      <div className="shadow-brutalist relative flex w-full flex-col overflow-hidden rounded border border-black bg-white lg:flex-row">
        {hasLogo ? (
          <div className="relative order-1 flex min-h-32 items-center justify-center border-b border-black bg-neutral-50 px-6 py-5 lg:order-2 lg:min-h-full lg:w-52 lg:shrink-0 lg:self-stretch lg:border-b-0 lg:border-l lg:px-8">
            <Image
              src={getImageSrc({ img: entry.logo, size: "original" })}
              alt={`${entry.company} logo`}
              sizes="(max-width: 1023px) 128px, 144px"
              className="h-24 w-full object-contain p-4"
              unoptimized
              fill
            />
          </div>
        ) : null}

        <div className="order-2 flex-1 p-6 lg:order-1">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-xs tracking-widest text-neutral-600 uppercase">{entry.period}</p>
                {entry.isCurrentRole ? (
                  <span className="bg-green-carribean rounded-full border border-black px-3 py-1 text-xs font-medium tracking-wide text-black uppercase">
                    Current
                  </span>
                ) : null}
              </div>

              <div className="mt-2 space-y-2">
                <h3 className="leading-tight">{entry.company}</h3>
                <p className="text-base font-medium text-neutral-800">{entry.role}</p>
              </div>
            </div>

            {entry.summary ? (
              <p className="max-w-3xl text-sm leading-7 whitespace-pre-line text-neutral-700">{entry.summary}</p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EmploymentHistoryList({ employmentHistory }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleEntries = useMemo(() => {
    if (isExpanded) {
      return employmentHistory;
    }

    return employmentHistory.slice(0, 1);
  }, [employmentHistory, isExpanded]);

  const hiddenCount = employmentHistory.length - visibleEntries.length;

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute top-6 bottom-6 left-4 w-px bg-black/20 sm:left-4" />

      <div className="space-y-8">
        {visibleEntries.map((entry, index) => (
          <EmploymentCard key={`${entry.company}-${entry.role}-${entry.period}-${index}`} entry={entry} index={index} />
        ))}
      </div>

      {hiddenCount > 0 ? (
        <div className="mt-8 pl-14 sm:pl-14">
          <Button className="max-w-fit text-sm" onClick={() => setIsExpanded((value) => !value)}>
            {isExpanded ? "Show Less" : `See More (${hiddenCount})`}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
