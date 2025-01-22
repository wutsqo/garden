import { Media } from "@/payload.types";

export const getImageSrc = (img: string | Media | null | undefined) => {
  if (typeof img === "string") return img;
  return img?.url ?? "/placeholder.jpg";
};
