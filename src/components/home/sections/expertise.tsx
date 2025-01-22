import Image from "next/image";
import SectionTitle from "../components/section-title";
import { EXPERTISES, STACKS } from "../data";
import s from "./expertise.module.css";

export default function Expertise() {
  return (
    <>
      <div className="container mt-24">
        <SectionTitle number="🔥" title="Expertise" />
        <div className="mt-8 flex flex-wrap items-baseline gap-4 text-base">
          {EXPERTISES.map((item) => (
            <div className="rounded border border-black bg-white px-4 py-2" key={item}>
              {item}
            </div>
          ))}
          <div className={s.item}>+++ And many more!</div>
        </div>
      </div>
      <div className={s.scroll}>
        <div className={s.scrollTitle}>
          {Array(3)
            .fill(STACKS)
            .flat()
            .map((item, i) => (
              <div className={s.stackItem} key={`${item.name}${i}`}>
                <div className={s.stackImageCotainer}>
                  <Image src={item.src} alt={item.name} fill />
                </div>
                <div className={s.stackName}>{item.name}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
