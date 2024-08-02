import Image from "next/image";
import s from "./bio.module.css";
import Avatar from "@images/avatar.png";
import { mergeClassname } from "@utils/merge-classname";

export default function Bio() {
  return (
    <div className={s.container}>
      <div className={mergeClassname("container mx-auto", s.innerContainer)}>
        <Image
          src={Avatar}
          alt="Muhammad Urwatil Wutsqo"
          width={120}
          height={120}
          className={s.avatar}
          placeholder="blur"
        />

        <h1 className={s.name}>Muhammad Urwatil Wutsqo</h1>

        <div className={s.desc}>
          <div className={s.icon}>💼</div>
          <div className="font-sans">Creative Technologist</div>
        </div>

        <div className={s.desc}>
          <div className={s.icon}>⚡</div>
          <div className="font-sans">Design & code</div>
        </div>

        <div className={s.desc}>
          <div className={s.icon}>📍</div>
          <div className="font-sans">Jakarta, Indonesia</div>
        </div>
      </div>
    </div>
  );
}
