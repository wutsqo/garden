import WorkCard from "@components/home/components/work-card";
import PageTitle from "@components/page-title";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

export const revalidate = 3600;

export default async function ProjectPage() {
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
    },
    where: {
      is_shown: {
        equals: true,
      },
    },
    sort: ["-weight"],
    pagination: false,
  });

  return (
    <main className="container mx-auto border-x border-gray-200 bg-white px-6 py-16">
      <PageTitle title="Projects" subtitle="A selection of public projects" xl />
      <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.docs.map((project, i) => (
          <WorkCard key={project.id} project={project} delay={i * 100} />
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
