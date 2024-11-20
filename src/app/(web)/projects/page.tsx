import { H1 } from "@components/mdx/headings";
import Glowing from "@components/glowing";
import WorkCard from "@components/home/components/work-card";
import { WORKS } from "@components/home/data";

export default async function ProjectPage() {
  return (
    <main className="container pt-16">
      <Glowing>
        <H1 className="text-5xl">Projects</H1>
      </Glowing>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {WORKS.map((project, i) => (
          <WorkCard key={project.title} {...project} delay={i * 100} />
        ))}
      </div>
    </main>
  );
}
