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
              Meet Muhammad Urwatil Wutsqo, a vibrant 22-year-old CS student
              from the University of Indonesia. He is driven by curiosity, a
              zest for life, and a passion for coding. Wutsqo finds inspiration
              in rejuvenating naps 💤 and exploring the real world 🌍. As an
              aspiring software engineer, he aims to conquer the ever-expanding
              tech industry 🔥 with his determination and thirst for success 💪.
              Wutsqo is ready to achieve great things 🚀 in this rapidly
              evolving landscape.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
