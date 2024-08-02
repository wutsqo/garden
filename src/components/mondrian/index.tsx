"use client";

import debounce from "just-debounce";
import s from "./index.module.css";
import { FC, useEffect, useState } from "react";
import MondrianCell from "./cell";
import { usePathname } from "next/navigation";

const GRID_COLORS: string[] = [
  "#DA1D7E",
  "#F8B725",
  "#885EDD",
  "#23C8A0",
  "#FFFFFF",
  "#000000",
];

interface Props {
  refresh?: string;
  squareCount?: number;
}

const Mondrian: FC<Props> = ({ refresh = "", squareCount = 0 }) => {
  const [count, setCount] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);
  const [out, setOut] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (refresh && loaded) {
      setOut(true);
      setTimeout(() => {
        setOut(false);
      }, 360);
    } else {
      setLoaded(true);
    }
  }, [loaded, refresh]);

  const setSquareCount = debounce(() => {
    let newGridWidth =
      (window.innerWidth /
        parseInt(
          window
            .getComputedStyle(window.document.body, null)
            .getPropertyValue("font-size")
        )) *
      2;

    if (gridWidth && gridWidth === newGridWidth) return;

    setGridWidth(newGridWidth);

    if (squareCount) {
      setCount(squareCount);
      return;
    }

    setCount(
      Math.floor(
        (window.innerWidth /
          (parseInt(
            window
              .getComputedStyle(window.document.body, null)
              .getPropertyValue("font-size")
          ) /
            0.65)) *
          2
      )
    );
  }, 300);

  useEffect(() => {
    setSquareCount();
    window.addEventListener("resize", setSquareCount);
    return () => {
      window.removeEventListener("resize", setSquareCount);
    };
  });

  const randomColor = () => {
    return GRID_COLORS[Math.floor(Math.random() * GRID_COLORS.length)];
  };

  const pathName = usePathname();

  return (
    <div className={s.gridContainer}>
      <div className={s.cellGrid} key={pathName}>
        {Array.from(Array(count).keys()).map((_, i) => (
          <MondrianCell
            color={randomColor()}
            gridWidth={gridWidth}
            out={out}
            key={pathName}
          />
        ))}
      </div>
    </div>
  );
};

export default Mondrian;
