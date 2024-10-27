import { ReactNode } from "react";
import { GardenContent } from "../interface";

export interface IslandLayoutProps {
  children: ReactNode;
}

export interface IslandProps {
  metadata: GardenContent;
  content?: string;
}
