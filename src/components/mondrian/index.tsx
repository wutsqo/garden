"use client";

import s from "./index.module.css";
import { FC, useMemo, useRef } from "react";
import MondrianCell from "./cell";
import { usePathname } from "next/navigation";
import { mergeClassname } from "@utils/merge-classname";

const GRID_COLORS: string[] = [
  "#DA1D7E",
  "#F8B725",
  "#885EDD",
  "#23C8A0",
  "#FFFFFF",
  "#000000",
];

interface MondrianProps {
  keyPrefix: string;
}

const Mondrian: FC<MondrianProps> = ({ keyPrefix }) => {
  const ref = useRef<HTMLDivElement>(null);
  const gridWidth = useMemo(() => {
    return (
      (window.innerWidth /
        parseInt(
          window
            .getComputedStyle(window.document.body, null)
            .getPropertyValue("font-size")
        )) *
      2
    );
  }, []);
  const count = useMemo(() => {
    return Math.floor(
      (window.innerWidth /
        (parseInt(
          window
            .getComputedStyle(window.document.body, null)
            .getPropertyValue("font-size")
        ) /
          0.65)) *
        2
    );
  }, []);

  const randomColor = () => {
    return GRID_COLORS[Math.floor(Math.random() * GRID_COLORS.length)];
  };

  const pathName = usePathname();

  return (
    <div
      className={mergeClassname(s.gridContainer, "page-transition")}
      ref={ref}
    >
      <div className={s.cellGrid} key={pathName}>
        {Array.from(Array(count).keys()).map((_, i) => (
          <MondrianCell
            color={randomColor()}
            gridWidth={gridWidth}
            key={`${keyPrefix}-${pathName}-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Mondrian;
