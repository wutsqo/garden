import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Homepage, Media } from "@/payload.types";
import { getImageSrc } from "@utils/images";
import SectionTitle from "../components/section-title";
import s from "./expertise.module.css";

type ExpertiseEntry = NonNullable<Homepage["expertises"]>[number];

export default async function Expertise() {
  const payload = await getPayload({ config });
  const [homepage, techStacks] = await Promise.all([
    payload.findGlobal({ slug: "homepage" }),
    payload.find({
      collection: "tech-stacks",
      select: {
        name: true,
        logo: true,
      },
      where: {
        is_shown: {
          equals: true,
        },
      },
      sort: ["-weight", "name"],
      pagination: false,
    }),
  ]);

  const expertises: ExpertiseEntry[] = homepage.expertises ?? [];
  const repeatedTechStacks = techStacks.docs.length > 0 ? Array(3).fill(techStacks.docs).flat() : [];

  return (
    <>
      <div className="container mx-auto mt-24 px-6">
        <SectionTitle number="🔥" title="Expertise" />
        <div className="mt-8 flex flex-wrap items-baseline gap-4 text-base">
          {expertises.map((item) => (
            <div className="rounded border border-black bg-white px-4 py-2" key={item.id ?? item.label}>
              {item.label}
            </div>
          ))}
          <div className={s.item}>+++ And many more!</div>
        </div>
      </div>

      {repeatedTechStacks.length > 0 ? (
        <div className={s.scroll}>
          <div className={s.scrollTitle}>
            {repeatedTechStacks.map((item, i) => {
              const logo = item.logo as Media;

              return (
                <div className={s.stackItem} key={`${item.id}-${i}`}>
                  <div className={s.stackImageCotainer}>
                    <Image src={getImageSrc({ img: item.logo })} alt={logo.alt ?? item.name} fill unoptimized />
                  </div>
                  <div className={s.stackName}>{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
