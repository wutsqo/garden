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

      <div className="mt-8 p-4 w-full flex flex-wrap gap-6 md:px-8 opacity-0 animate-fade-in-up animation-delay-[900ms]">
        {WORKS.slice(0, 3).map((work) => (
          <WorkCard {...work} key={work.title} />
        ))}

        <div className="w-1/3 shrink-0 hidden sm:block lg:hidden"></div>

        {collapsed
          ? null
          : WORKS.slice(3).map((work) => (
              <WorkCard {...work} key={work.title} />
            ))}
      </div>

      <div className={"mb-12 p-4 md:px-8"}>
        <Button
          onClick={() => {
            setCollapsed((prev) => !prev);
          }}
        >
          See {collapsed ? "more" : "less"}
        </Button>
      </div>
    </div>
  );
};

export default SelectedWorks;
