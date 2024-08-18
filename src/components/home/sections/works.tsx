"use client";

import { FC, useState } from "react";
import SectionTitle from "../components/section-title";
import s from "./works.module.css";
import WorkCard from "../components/work-card";
import { WORKS } from "../data";
import Button from "@components/button";

const SelectedWorks: FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <SectionTitle number="🎨" title="Selected Works" />
      </div>

      <div className={s.works}>
        {WORKS.slice(0, 3).map((work) => (
          <WorkCard {...work} key={work.title} />
        ))}

        {collapsed
          ? null
          : WORKS.slice(3).map((work) => (
              <WorkCard {...work} key={work.title} />
            ))}
      </div>

      <Button
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
        className="max-w-fit"
      >
        See {collapsed ? "more" : "less"}
      </Button>
    </div>
  );
};

export default SelectedWorks;
