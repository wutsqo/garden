"use client";

import { mergeClassname } from "@utils/merge-classname";
import s from "./cell.module.css";
import { FC, useEffect, useState } from "react";

interface Props {
  color?: string;
  out?: boolean;
  gridWidth?: number;
}

const MondrianCell: FC<Props> = ({
  color = "transparent",
  out = false,
  gridWidth = 0,
}) => {
  const [size, setSize] = useState(0.5);

  useEffect(() => {
    const cellSize = Math.random();
    if (cellSize > 0.95) {
      setSize(1.5);
    } else if (cellSize > 0.8) {
      setSize(1);
    }
  }, []);

  const randomDelay = () => {
    return Math.random() * 0.5 + "s";
  };

  const randomX = () => {
    const randomLeftValue =
      Math.floor(Math.random() * gridWidth - 1) - size * 2;
    return `${randomLeftValue / 2}rem`;
  };

  const randomDrop = (): string => {
    const drop = Math.random() * 100;
    if (drop > 93) {
      return "1rem";
    } else if (drop > 80) {
      return "0.5rem";
    } else if (drop > 60) {
      return "-0.5rem";
    } else if (drop > 40) {
      return "-1rem";
    }
    return "0";
  };

  const randomTiming = (): number => {
    return Math.floor(Math.random() * 360 * 1.2);
  };

  return (
    <div key={randomTiming()}>
      <div
        className={mergeClassname(s.cell, out ? s.out : "")}
        style={{
          background: color,
          width: `${size}rem`,
          height: `${size}rem`,
          animationDelay: randomDelay(),
          top: randomDrop(),
          left: randomX(),
        }}
      />
    </div>
  );
};

export default MondrianCell;
