import Experiences from "@containers/home/sections/experiences";
import Expertise from "@containers/home/sections/expertise";
import Hero from "@containers/home/sections/hero";
import Works from "@containers/home/sections/works";
import s from "./page.module.css";
import About from "@containers/home/sections/about-v2";
import Contact from "@containers/home/sections/contact";

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
