import Image from "next/image";
import SectionTitle from "../components/section-title";
import { EXPERTISES, STACKS } from "../data";
import s from "./expertise.module.css";

export default function Expertise() {
  return (
    <>
      <div className={s.wrapper}>
        <SectionTitle number="🔥" title="Expertise" />
        <div className={s.content}>
          {EXPERTISES.map((item) => (
            <span className={s.item} key={item}>
              {item}.{" "}
            </span>
          ))}
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
