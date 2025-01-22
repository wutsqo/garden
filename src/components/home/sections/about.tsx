import SectionTitle from "../components/section-title";
import AboutMap from "@components/map";

export default function About() {
  return (
    <div className="bg-green-carribean mt-24 border-y border-y-black py-16">
      <div className="container flex flex-col gap-8">
        <SectionTitle number="📋" title="About" />

        <div className="shadow-brutalist flex flex-col divide-x-0 divide-y divide-black overflow-hidden rounded border border-black md:flex-row md:divide-x md:divide-y-0">
          <div className="h-80 w-full md:max-w-xs">
            <AboutMap />
          </div>

          <div className="prose relative h-80 w-full max-w-full overflow-y-auto bg-white px-4 text-lg text-black md:px-8 flex flex-col justify-center">
            <p className="max-w-xl">
              Hi, I am <strong>Wutsqo / Uko</strong> (he/him), a Jakarta-based Creative Developer. I indulge in{" "}
              <strong>web technologies</strong> both for fun and for a living.
            </p>
            <p className="max-w-xl">
              I also love to run, attend community events, and currently an active member of a local{" "}
              <a href="https://www.instagram.com/makarabookclub/" target="_blank" rel="noopener noreferrer">
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
