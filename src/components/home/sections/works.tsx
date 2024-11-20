import { FC } from "react";
import SectionTitle from "../components/section-title";
import s from "./works.module.css";
import WorkCard from "../components/work-card";
import { WORKS } from "../data";
import Button from "@components/button";

const SelectedWorks: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <SectionTitle number="🎨" title="Selected Works" />
      </div>

      <div className={s.works}>
        {WORKS.slice(0, 3).map((work) => (
          <WorkCard {...work} key={work.title} />
        ))}
      </div>

      <Button href="/projects" className="max-w-fit">
        See more
      </Button>
    </div>
  );
};

export default SelectedWorks;
