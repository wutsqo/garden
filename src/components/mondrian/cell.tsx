import { mergeClassname } from "@utils/merge-classname";
import s from "./cell.module.css";
import { FC } from "react";

interface Props {
  color?: string;
  out?: boolean;
  gridWidth?: number;
  seed?: number;
}

const seededValue = (seed: number, offset = 0): number => {
  const x = Math.sin(seed * 12.9898 + offset * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const MondrianCell: FC<Props> = ({
  color = "transparent",
  out = false,
  gridWidth = 0,
  seed = 0,
}) => {
  const sizePick = seededValue(seed, 1);
  const size = sizePick > 0.5 ? 1 : sizePick > 0.25 ? 1.5 : 2;
  const delay = `${(seededValue(seed, 2) * 0.5).toFixed(3)}s`;
  const x = `${Math.floor(seededValue(seed, 3) * gridWidth) - size * 2 + 2}rem`;
  const drop = seededValue(seed, 4) * 100;
  const y =
    drop > 93 ? "1rem" : drop > 80 ? "0.5rem" : drop > 60 ? "-0.5rem" : drop > 40 ? "-1rem" : "0rem";

  return (
    <div>
      <div
        className={mergeClassname(s.cell, out ? s.out : "")}
        style={{
          background: color,
          width: `${size}rem`,
          height: `${size}rem`,
          animationDelay: delay,
          top: y,
          left: x,
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default MondrianCell;
