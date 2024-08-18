"use client";

import s from "./index.module.css";
import { FC, useMemo } from "react";
import MondrianCell from "./cell";
import { usePathname } from "next/navigation";
import { mergeClassname } from "@utils/merge-classname";
import { useWindowSize } from "@hooks/use-window-resize";

const COLORS: string[] = ["#DA1D7E", "#F8B725", "#885EDD", "#23C8A0"];

interface MondrianProps {
  keyPrefix: string;
}

const Mondrian: FC<MondrianProps> = ({ keyPrefix }) => {
  const [windowWidth] = useWindowSize();
  const gridWidth = useMemo(() => {
    return (
      windowWidth /
      parseInt(
        window
          .getComputedStyle(window.document.body)
          .getPropertyValue("font-size")
      )
    );
  }, [windowWidth]);
  const count = useMemo(() => {
    return Math.floor(
      (windowWidth /
        parseInt(
          window
            .getComputedStyle(window.document.body)
            .getPropertyValue("font-size")
        )) *
        0.5
    );
  }, [windowWidth]);

  const randomColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  const pathName = usePathname();

  return (
    <div
      className={mergeClassname(s.gridContainer, "page-transition")}
      key={windowWidth}
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
