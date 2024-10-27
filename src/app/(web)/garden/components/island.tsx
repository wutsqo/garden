import { FC } from "react";
import { IslandProps } from "./interface";
import IslandImage from "./island-image";
import IslandLayout from "./island-layout";
import IslandTitle from "./island-title";
import IslandHeader from "./island-header";

const Island: FC<IslandProps> = ({ metadata, content }) => {
  return (
    <IslandLayout>
      <IslandHeader metadata={metadata} />
      <IslandImage metadata={metadata} />
      <IslandTitle metadata={metadata} />
    </IslandLayout>
  );
};

export default Island;