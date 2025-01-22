import { FC } from "react";
import SectionTitle from "../components/section-title";
import WorkCard from "../components/work-card";
import { WORKS } from "../data";
import Button from "@components/button";

const SelectedWorks: FC = () => {
  return (
    <div className="container mx-auto px-6 flex flex-col gap-6">
      <div>
        <SectionTitle number="🎨" title="Selected Works" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WORKS.slice(0, 3).map((work) => (
          <WorkCard {...work} key={work.title} />
        ))}
      </div>

      <Button href="/projects" className="max-w-fit">
        See More Projects
      </Button>
    </div>
  );
};

export default SelectedWorks;
