import { FC } from "react";
import s from "./work-card.module.css";
import Image from "next/image";
import { mergeClassname } from "@utils/merge-classname";
import { ArrowUpRight } from "lucide-react";
import { Media, Project, TechStack } from "@/payload.types";
import { getImageSrc } from "@utils/images";

const WorkCard: FC<{ project: Partial<Project>; delay?: number }> = ({
  project: { title, description, category, live_url, repo_url, tech_stack, thumbnail },
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
            className="object-cover object-center border-b border-black"
            unoptimized
          />
        </div>
      ) : null}
      <div className={mergeClassname(s.content, (live_url || repo_url) && "mb-12")}>
        <div className={s.title}>
          <h3>{title}</h3>
        </div>
        <div className={s.stack}>
          {(tech_stack as TechStack[]).map((item) => (
            <div className={s.logos} key={item.id}>
              <Image
                src={getImageSrc({ img: item.logo })}
                alt={(item.logo as Media).alt ?? item.name}
                fill
                unoptimized
              />
            </div>
          ))}
          <span className={s.label}>{category}</span>
        </div>
        <div className={s.desc}>
          <p>{description}</p>
        </div>
      </div>

      {live_url ? (
        <a href={live_url} target="_blank" rel="noopener noreferrer group">
          <div className="hover:bg-yellow-beer absolute right-0 bottom-0 left-0 flex items-center justify-center gap-2 border-t border-black px-4 py-3">
            See live{" "}
            <span className="transition-all group-hover:translate-x-2">
              <ArrowUpRight />
            </span>
          </div>
        </a>
      ) : null}

      {repo_url ? (
        <a href={repo_url} target="_blank" rel="noopener noreferrer group">
          <div className="hover:bg-yellow-beer absolute right-0 bottom-0 left-0 flex items-center justify-center gap-2 border-t border-black px-4 py-3">
            See repo{" "}
            <span className="transition-all group-hover:translate-x-2">
              <ArrowUpRight />
            </span>
          </div>
        </a>
      ) : null}
    </div>
  );
};

export default WorkCard;
