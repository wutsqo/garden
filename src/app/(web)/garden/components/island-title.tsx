import { FC } from "react";
import { IslandProps } from "./interface";

const IslandTitle: FC<IslandProps> = ({ metadata }) => {
  if (metadata.type === "Image") return null;

  return (
    <div className="p-4 bg-white">
      <h4>{metadata.title}</h4>
    </div>
  );
};

export default IslandTitle;
