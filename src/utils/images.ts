import { ImageSizeName } from "@/collections/media";
import { Media } from "@/payload.types";

const DEFAULT_IMAGE = "/images/no-image.svg";

type GetImageSrcProps = {
  img: string | Media | null | undefined;
  size?: ImageSizeName | "original";
};

export const getImageSrc = ({ img, size = "original" }: GetImageSrcProps): string => {
  if (!img) return DEFAULT_IMAGE;
  if (typeof img === "string") return img;
  if (size === "original") return img.url ?? DEFAULT_IMAGE;
  return img.sizes?.[size]?.url ?? img.url ?? DEFAULT_IMAGE;
};
