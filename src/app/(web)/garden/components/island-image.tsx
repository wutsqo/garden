import { FC } from "react";
import { IslandProps } from "./interface";
import Image from "next/image";

const IslandImage: FC<IslandProps> = ({ metadata }) => {
  if (!metadata.image) return null;
  return (
    <div className="relative w-full aspect-square">
      <Image
        src={metadata.image}
        alt={metadata.title}
        fill
        className="object-cover object-center"
      />

      {metadata.type === "Image" && (
        <div className="absolute bottom-0 left-0 w-full bg-white translate-y-full group-hover:translate-y-0 p-4 text-sm transition-all duration-200">
          {metadata.title}
        </div>
      )}
    </div>
  );
};

export default IslandImage;
