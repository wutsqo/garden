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
    <div className="mt-24">
      <div className="container">
        <SectionTitle number="🚀" title="Experiences" />
      </div>
      <div className="container">
        <div className={s.companies}>
          <div
            className={mergeClassname(s.marker, s[colors[activeId % colors.length]])}
            style={{
              transform: `translateX(${activeId * 100}%)`,
            }}
          />
          {EXPERIENCES.map((experience, i) => (
            <button
              key={experience.id}
              className={mergeClassname(s.company, experience.id === activeId ? s.active : "")}
              onClick={() => setActiveId(experience.id)}
            >
              {experience.company}
            </button>
          ))}
        </div>
      </div>
      <div className={s.innerWrapper}>
        <div className={s.detail}>
          <h3 className={s.header}>
            <span className={s.title}>{activeExperience.title}</span> @ <span>{activeExperience.company}</span>
          </h3>
          <div className={s.date}>{activeExperience.date}</div>
          <div className={s.description}>
            <ul>
              {activeExperience.desc.map((desc) => (
                <li
                  key={desc}
                  dangerouslySetInnerHTML={{
                    __html: desc,
                  }}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
