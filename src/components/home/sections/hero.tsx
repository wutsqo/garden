import Button from "@components/button";
import Glowing from "@components/glowing";

export default function Hero() {
  return (
    <div className="container mx-auto py-28 font-sans font-medium">
      <div className="text-4xl leading-normal sm:text-5xl sm:leading-normal xl:text-6xl xl:leading-normal">
        <span>Wutsqo is a </span>
        <Glowing>
          <span>Creative Developer</span>
        </Glowing>
        <span> who makes beautiful and functional digital products.</span>
      </div>

      <Button href="/services" className="mt-12 block max-w-max text-base">
        See My Services
      </Button>
    </div>
  );
}
