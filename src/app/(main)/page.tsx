import Experiences from "@components/home/sections/experiences";
import Expertise from "@components/home/sections/expertise";
import Hero from "@components/home/sections/hero";
import Works from "@components/home/sections/works";
import s from "./page.module.css";
import About from "@components/home/sections/about-v2";
import Contact from "@components/home/sections/contact";

export default function Home() {
  return (
    <main className={s.main}>
      <div className="container mx-auto">
        <Hero />
        <Works />
        <Expertise />
        <Experiences />
        <About />
        <Contact />
      </div>
    </main>
  );
}
