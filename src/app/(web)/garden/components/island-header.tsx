import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { IslandProps } from "./interface";

const IslandHeader: FC<IslandProps> = ({ metadata }) => {
  if (metadata.type === "Image") return null;

  return (
    <div className="text-xs uppercase flex justify-between items-center p-4 top-0 z-10 bg-white w-full">
      <div>
        {metadata.type} • {metadata.createdAt}
      </div>
      <div>
        <ArrowRightIcon className="w-4 h-4 inline" />
      </div>
    </div>
  );
};

export default IslandHeader;
