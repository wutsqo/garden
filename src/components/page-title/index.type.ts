import { HTMLProps } from "react";

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  xl?: boolean;
  notGlowing?: boolean;
  titleProps?: HTMLProps<HTMLHeadingElement>;
  subtitleProps?: HTMLProps<HTMLDivElement>;
}
