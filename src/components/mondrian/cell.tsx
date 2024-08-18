import { mergeClassname } from "@utils/merge-classname";
import s from "./cell.module.css";
import { FC } from "react";

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
  const size = Math.random() > 0.5 ? 1 : Math.random() > 0.5 ? 1.5 : 2;
  const delay = Math.random() * 0.5 + "s";
  const x = `${Math.floor(Math.random() * gridWidth) - size * 2 + 2}rem`;
  const randomDrop = () => {
    const drop = Math.random() * 100;
    if (drop > 93) {
      return 1;
    } else if (drop > 80) {
      return 0.5;
    } else if (drop > 60) {
      return -0.5;
    } else if (drop > 40) {
      return -1;
    }
    return 0;
  };
  const y = `${randomDrop()}rem`;

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
