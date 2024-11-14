import Link from "next/link";
import SectionTitle from "../components/section-title";
import s from "./about.module.css";

export default function About() {
  return (
    <div className={s.outerWrapper}>
      <div className={s.wrapper}>
        <SectionTitle number="📋" title="About" />

        <div className={s.content}>
          <iframe src="/map" title="Map" className="h-80 w-full md:max-w-xs" />
          <div className={s.story}>
            <p>
              Hi, I am <strong>Wutsqo / Uko</strong> (he/him), a Jakarta-based
              Creative Developer. I indulge in <strong>web technologies</strong>{" "}
              both for fun and for a living.
            </p>
            <p>
              I also love to run, attend community events, and currently
              managing a local{" "}
              <a
                href="https://www.instagram.com/makarabookclub/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>book club</strong>
              </a>{" "}
              📚 in my area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
