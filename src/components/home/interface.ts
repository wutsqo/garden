import { StaticImageData } from "next/image";
import { STACKS, LABELS } from "./data";

type Stack = (typeof STACKS)[number];

export interface Work {
  title: string;
  description: string;
  image?: StaticImageData;
  live?: string;
  repo?: string;
  label: (typeof LABELS)[number];
  stack: Stack["name"][];
}
