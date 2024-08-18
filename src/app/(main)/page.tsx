import Hero from "@components/home/sections/hero";
import Works from "@components/home/sections/works";
import Expertise from "@components/home/sections/expertise";
import Experiences from "@components/home/sections/experiences";
import Contact from "@components/home/sections/contact";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@components/home/sections/about"));

export default function Home() {
  return (
    <main>
      <Hero />
      <Works />
      <Expertise />
      <Experiences />
      <About />
      <Contact />
    </main>
  );
}
