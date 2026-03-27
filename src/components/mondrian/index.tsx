"use client";

import s from "./index.module.css";
import { FC, useMemo } from "react";
import MondrianCell from "./cell";
import { usePathname } from "next/navigation";
import { mergeClassname } from "@utils/merge-classname";
import { useWindowSize } from "@hooks/use-window-size";

const COLORS: string[] = ["#DA1D7E", "#F8B725", "#885EDD", "#23C8A0"];

interface MondrianProps {
  keyPrefix: string;
}

const stringToSeed = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const Mondrian: FC<MondrianProps> = ({ keyPrefix }) => {
  const [windowWidth] = useWindowSize();
  const gridWidth = useMemo(() => {
    return windowWidth / 16;
  }, [windowWidth]);
  const count = useMemo(() => {
    return Math.floor((windowWidth / 16) * 0.5);
  }, [windowWidth]);

  const pathName = usePathname();
  const pathSeed = useMemo(() => stringToSeed(pathName), [pathName]);
  return (
    <div
      className={mergeClassname(s.gridContainer, "page-transition")}
      key={windowWidth}
    >
      <div className={s.cellGrid} key={pathName}>
        {Array.from(Array(count).keys()).map((_, i) => (
          <MondrianCell
            color={COLORS[(pathSeed + i) % COLORS.length]}
            gridWidth={gridWidth}
            seed={pathSeed + i}
            key={`${keyPrefix}-${pathName}-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Mondrian;
