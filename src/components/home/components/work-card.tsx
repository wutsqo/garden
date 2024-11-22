import { FC } from "react";
import s from "./work-card.module.css";
import { Work } from "../interface";
import Image from "next/image";
import { STACKS } from "../data";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { mergeClassname } from "@utils/merge-classname";

const WorkCard: FC<
  Work & {
    delay?: number;
  }
> = ({ title, description, image, label, live, stack, repo, delay }) => {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={mergeClassname(
        "w-full shadow-brutalist border-2 border-black bg-white relative overflow-hidden rounded",
        delay ? "opacity-0 animate-fade-in" : ""
      )}
    >
      {image ? (
        <div className={s.imageContainer}>
          <Image
            src={image}
            alt={title}
            placeholder="blur"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}
      <div className={mergeClassname(s.content, (live || repo) && "mb-12")}>
        <div className={s.title}>
          <h3>{title}</h3>
        </div>
        <div className={s.stack}>
          {stack.map((item) => (
            <div className={s.logos} key={item}>
              <Image
                src={STACKS.find((stack) => stack.name === item)!.src}
                alt={item}
                fill
              />
            </div>
          ))}
          <span className={s.label}>{label}</span>
        </div>
        <div className={s.desc}>
          <p>{description}</p>
        </div>
      </div>

      {live ? (
        <a href={live} target="_blank" rel="noopener noreferrer group">
          <div className="border-t-2 border-black px-4 py-3 flex gap-2 items-center justify-center absolute bottom-0 left-0 right-0 hover:bg-yellow-beer">
            See live{" "}
            <span className="group-hover:translate-x-2 transition-all">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </div>
        </a>
      ) : null}

      {repo ? (
        <a href={repo} target="_blank" rel="noopener noreferrer group">
          <div className="border-t-2 border-black px-4 py-3 flex gap-2 items-center justify-center absolute bottom-0 left-0 right-0 hover:bg-yellow-beer">
            See repo{" "}
            <span className="group-hover:translate-x-2 transition-all">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </div>
        </a>
      ) : null}
    </div>
  );
};

export default WorkCard;
