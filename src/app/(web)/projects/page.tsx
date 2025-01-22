import WorkCard from "@components/home/components/work-card";
import { WORKS } from "@components/home/data";
import PageTitle from "@components/page-title";
import Link from "next/link";

export default async function ProjectPage() {
  return (
    <main className="container mx-auto px-6 border-x border-gray-200 bg-white py-16">
      <PageTitle title="Projects" subtitle="A selection of public projects" xl />
      <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WORKS.map((project, i) => (
          <WorkCard key={project.title} {...project} delay={i * 100} />
        ))}
      </div>
      <div className="bg-yellow-beer shadow-brutalist mt-8 rounded border border-black py-12 text-center text-3xl">
        Interested in working together?{" "}
        <Link
          className="hover:text-yellow-beer bg-linear-to-r from-black to-black bg-[length:0%_100%] bg-no-repeat underline transition-all duration-300 hover:bg-[length:100%_100%] hover:no-underline"
          href="/services#want-to-work-together"
        >
          Let&apos;s Talk
        </Link>
        .
      </div>
    </main>
  );
}
