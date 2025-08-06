import Button from "@components/button";
import Glowing from "@components/glowing";

export default function Hero() {
  return (
    <div className="container mx-auto px-6 py-24 font-sans font-medium">
      <div className="text-4xl leading-normal sm:text-5xl sm:leading-normal xl:text-6xl xl:leading-normal">
        <span>Wutsqo is a </span>
        <Glowing>
          <span>Creative Developer</span>
        </Glowing>
        <span> who makes beautiful and functional digital products.</span>
      </div>

      <div className="mt-12 text-xl">
        <span>Currently SWE @ Gojek</span>
      </div>

      <Button href="/services" className="mt-12 block max-w-max text-base">
        See My Services
      </Button>
    </div>
  );
}
