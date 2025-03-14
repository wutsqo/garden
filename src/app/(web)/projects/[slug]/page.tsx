import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import RichText from "@components/rich-text";
import Image from "next/image";
import { getImageSrc } from "@utils/images";
import { Teammate, TechStack } from "@/payload.types";
import { LinkIcon } from "lucide-react";
import TableOfContents from "@components/rich-text/table-of-contents";

export type Params = Promise<{
  slug: string;
}>;

export default async function Page({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "projects",
    select: {
      title: true,
      description: true,
      category: true,
      live_url: true,
      repo_url: true,
      tech_stack: true,
      thumbnail: true,
      write_up: true,
      team_members: true,
      timeline: true,
    },
    where: {
      slug: {
        equals: slug,
      },
      is_shown: {
        equals: true,
      },
    },
  });
  if (!result.docs.length) notFound();
  const project = result.docs[0];

  return (
    <main className="relative bg-white">
      <div className="relative w-full border-b-2 border-black bg-black">
        <div className="absolute top-0 left-0 z-0 h-full w-full">
          <Image
            src={getImageSrc({ img: project.thumbnail })}
            alt={project.title}
            fill
            className="object-cover object-center"
          />
          <div className="absolute h-full w-full bg-gradient-to-b from-black to-black/50 backdrop-blur-lg"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="prose sm:prose-lg max-w-none text-white">
            <h1 className="text-5xl text-white sm:text-7xl" style={{ marginBottom: 0 }}>
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl" style={{ marginTop: "1em" }}>
              {project.description}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-x-20 gap-y-8 py-8 sm:flex-row sm:flex-wrap">
          {project.team_members && project.team_members.length > 0 && (
            <div>
              <h2 className="text-xl">Team Members</h2>
              <ul className="mt-2 space-y-0.5">
                {project.team_members.map((teammate) => (
                  <li key={teammate.id!}>{(teammate.name as Teammate).name}</li>
                ))}
              </ul>
            </div>
          )}
          {project.timeline && (
            <div className="">
              <h2 className="text-xl">Timeline</h2>
              <p className="mt-3">{project.timeline}</p>
            </div>
          )}
          {project.tech_stack && (
            <div className="">
              <h2 className="text-xl">Tech Stack</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <li
                    key={(tech as TechStack).id}
                    className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1.5 text-sm"
                  >
                    <Image
                      src={getImageSrc({ img: (tech as TechStack).logo })}
                      alt={(tech as TechStack).name}
                      width={16}
                      height={16}
                    />
                    <span>{(tech as TechStack).name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(project.live_url || project.repo_url) && (
            <div className="">
              <h2 className="text-xl">External Links</h2>
              <ul className="mt-2 space-y-2">
                {project.live_url && (
                  <li>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 underline"
                    >
                      <LinkIcon size={16} />
                      Live Site
                    </a>
                  </li>
                )}
                {project.repo_url && (
                  <li>
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 underline"
                    >
                      <LinkIcon size={16} />
                      Source Code
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        {project.thumbnail && (
          <div className="relative aspect-video w-full">
            <Image
              src={getImageSrc({ img: project.thumbnail })}
              alt={project.title}
              fill
              className="object-cover object-center"
            />
          </div>
        )}
        <div className="flex flex-col gap-x-40 gap-y-20 lg:flex-row">
          <div className="max-w-xl shrink-0 self-start lg:sticky lg:top-28 pt-16">
            {project.write_up && <TableOfContents data={project.write_up} />}
          </div>
          <div className="prose sm:prose-lg max-w-xl font-sans">
            {project.write_up && <RichText data={project.write_up} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export const generateStaticParams = async () => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "projects",
    select: {
      slug: true,
    },
  });
  return result.docs.map((doc) => ({
    slug: doc.slug as string,
  }));
};
