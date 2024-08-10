import { readFileSync } from "fs";
import { getPlaiceholder } from "plaiceholder";

const getImage = async (src: string) => {
  const buffer = readFileSync(new URL(`../../public${src}`, import.meta.url));

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export default getImage;
