"use client";

import useMousePosition from "@hooks/use-mouse-position";
import { CSSProperties, FC, useState } from "react";
import { motion } from "framer-motion";
import { atom, useAtomValue } from "jotai";
import { COLOR_PALETTE } from "@utils/color";

type hoverType = "button" | "none";

export const isHoveringAtom = atom<hoverType>("none");

const styles: Record<hoverType, CSSProperties> = {
  none: {
    height: 40,
    width: 40,
    backgroundColor: COLOR_PALETTE["bluish-purple"],
  },
  button: {
    height: 80,
    width: 80,
    backgroundColor: COLOR_PALETTE["green-carribean"],
  },
};

const Pointer: FC = () => {
  const { x, y } = useMousePosition();
  const isHovering = useAtomValue(isHoveringAtom);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-50 border border-black"
      animate={{
        top: y,
        left: x,
        height: styles[isHovering].height,
        width: styles[isHovering].width,
        backgroundColor: styles[isHovering].backgroundColor,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    ></motion.div>
  );
};

export default Pointer;
