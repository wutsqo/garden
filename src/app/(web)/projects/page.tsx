import WorkCard from "@components/home/components/work-card";
import { WORKS } from "@components/home/data";
import PageTitle from "@components/page-title";
import Link from "next/link";

export default async function ProjectPage() {
  return (
    <main className="container py-16 bg-white border-x">
      <PageTitle
        title="Projects"
        subtitle="A selection of public projects"
        xl
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {WORKS.map((project, i) => (
          <WorkCard key={project.title} {...project} delay={i * 100} />
        ))}
      </div>
      <div className="text-center text-3xl mt-8 py-12 border border-black bg-yellow-beer shadow-brutalist rounded">
        Interested in working together?{" "}
        <Link
          className="underline hover:no-underline bg-gradient-to-r from-black to-black bg-[length:0%_100%] hover:bg-[length:100%_100%] bg-no-repeat hover:text-yellow-beer transition-all duration-300"
          href="/services#want-to-work-together"
        >
          Let&apos;s Talk
        </Link>
        .
      </div>
    </main>
  );
}
