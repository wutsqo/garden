import { FC } from "react";
import s from "./work-card.module.css";
import Image from "next/image";
import { mergeClassname } from "@utils/merge-classname";
import { Project } from "@/payload.types";
import { getImageSrc } from "@utils/images";
import Link from "next/link";
import Button from "@components/button";

const WorkCard: FC<{ project: Partial<Project>; delay?: number }> = ({
  project: { title, description, thumbnail, slug },
  delay,
}) => {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={mergeClassname(
        "shadow-brutalist relative w-full overflow-hidden rounded border border-black bg-white",
        delay ? "animate-fade-in opacity-0" : "",
        thumbnail ? "row-span-2" : "row-span-1",
      )}
    >
      {thumbnail ? (
        <div className={s.imageContainer}>
          <Image
            src={getImageSrc({ img: thumbnail, size: "wide" })}
            alt={`Thumbnail for ${title}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="border-b border-black object-cover object-center"
            unoptimized
          />
        </div>
      ) : null}
      <div className={s.content}>
        <div className={s.title}>
          <h3>{title}</h3>
        </div>

        <div className={s.desc}>
          <p>{description}</p>
        </div>

        <div className="mt-6">
          <Link href={`/projects/${slug}`} className="w-full">
            <Button noShadow className="hover:bg-green-carribean w-full">
              View Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
