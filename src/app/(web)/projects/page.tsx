import WorkCard from "@components/home/components/work-card";
import { WORKS } from "@components/home/data";
import PageTitle from "@components/page-title";

export default async function ProjectPage() {
  return (
    <main className="container py-16 bg-white border">
      <PageTitle title="Projects" subtitle="A selection of public projects" xl />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {WORKS.map((project, i) => (
          <WorkCard key={project.title} {...project} delay={i * 100} />
        ))}
      </div>
    </main>
  );
}
