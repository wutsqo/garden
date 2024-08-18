"use client";

import { mergeClassname } from "@utils/merge-classname";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import s from "./index.module.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const tlClick = useRef<gsap.core.Timeline>();
  const tlHover = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tlClick.current = gsap
        .timeline({
          paused: true,
        })
        .to(ref.current, {
          duration: 0.1,
          translateX: 4,
          translateY: 4,
          boxShadow: "0 0 #1a1a1a",
        })
        .to(ref.current, {
          duration: 0.05,
          translateX: 0,
          translateY: 0,
          boxShadow: "2px 2px #1a1a1a",
        });

      tlHover.current = gsap
        .timeline({ paused: true })
        .to("span", { duration: 0.2, yPercent: -150, ease: "power2.in" })
        .set("span", { yPercent: 150 })
        .to("span", { duration: 0.2, yPercent: 0 });
    }, ref);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <button
      className={mergeClassname(s.button, className)}
      onClick={() => {
        tlClick.current?.restart();
        onClick?.();
      }}
      onMouseEnter={() => tlHover.current?.play(0)}
      ref={ref}
    >
      <span className={s.children}>{children}</span>
    </button>
  );
};

export default Button;
