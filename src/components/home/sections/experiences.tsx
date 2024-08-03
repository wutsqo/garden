"use client";

import { useState } from "react";
import SectionTitle from "../components/section-title";
import { EXPERIENCES } from "../data";
import s from "./experiences.module.css";
import { mergeClassname } from "@utils/merge-classname";
import { COLOR_PALETTE } from "@utils/color";

export default function Experiences() {
  const [activeId, setActiveId] = useState(1);

  const activeExperience = EXPERIENCES[activeId];
  if (!activeExperience) return null;
  const colors = Object.keys(COLOR_PALETTE);

  return (
    <>
      <div className={s.container}>
        <SectionTitle number="🚀" title="Experiences" />
      </div>
      <div className={s.companies}>
        <div
          className={mergeClassname(
            s.marker,
            s[colors[activeId % colors.length]]
          )}
          style={{
            transform: `translateX(${activeId * 100}%)`,
          }}
        />
        {EXPERIENCES.map((experience, i) => (
          <button
            key={experience.id}
            className={mergeClassname(
              s.company,
              experience.id === activeId ? s.active : ""
            )}
            onClick={() => setActiveId(experience.id)}
          >
            {experience.company}
          </button>
        ))}
      </div>
      <div className={s.detail}>
        <h3 className={s.header}>
          <span className={s.title}>{activeExperience.title}</span> @{" "}
          <span>{activeExperience.company}</span>
        </h3>
        <div className={s.date}>{activeExperience.date}</div>
        <div className={s.description}>
          {activeExperience.desc.map((desc) => (
            <li
              key={desc}
              dangerouslySetInnerHTML={{
                __html: desc,
              }}
            ></li>
          ))}
        </div>
      </div>
    </>
  );
}
