import { FC } from "react";
import { IslandLayoutProps } from "./interface";

const IslandLayout: FC<IslandLayoutProps> = ({ children }) => (
  <div className="border border-gray-400 rounded bg-white flex flex-col overflow-hidden mb-8 group relative">
    {children}
  </div>
);

export default IslandLayout;
