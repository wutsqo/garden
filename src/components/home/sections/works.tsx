import { FC } from "react";
import SectionTitle from "../components/section-title";
import WorkCard from "../components/work-card";
import Button from "@components/button";
import { getPayload } from "payload";
import config from "@payload-config";

const SelectedWorks: FC = async () => {
  const payload = await getPayload({ config });
  const projects = await payload.find({
    collection: "projects",
    select: {
      title: true,
      thumbnail: true,
      category: true,
      description: true,
      live_url: true,
      repo_url: true,
      tech_stack: true,
      slug: true,
    },
    where: {
      is_shown: {
        equals: true,
      },
    },
    sort: ["-weight"],
    limit: 3,
  });

  return (
    <div className="container mx-auto flex flex-col gap-6 px-6">
      <div>
        <SectionTitle number="🎨" title="Selected Works" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.docs.map((project) => (
          <WorkCard project={project} key={project.id} />
        ))}
      </div>

      <Button href="/projects" className="max-w-fit">
        See More Projects
      </Button>
    </div>
  );
};

export default SelectedWorks;
