import Hero from "@components/home/sections/hero";
import Works from "@components/home/sections/works";
import EmploymentHistory from "@components/home/sections/employment-history";
import Expertise from "@components/home/sections/expertise";
import Contact from "@components/home/sections/contact";
import AboutClient from "@components/home/sections/about-client";

export default function Home() {
  return (
    <main>
      <Hero />
      <Works />
      <EmploymentHistory />
      <Expertise />
      <AboutClient />
      <Contact />
    </main>
  );
}
