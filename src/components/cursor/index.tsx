"use client";

import { gsap } from "gsap";
import React, { useLayoutEffect } from "react";

const Cursor = () => {
  const wrap = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("span", {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
      });

      window.addEventListener("mousemove", (e) => {
        gsap.to("span", {
          duration: 0.5,
          overwrite: "auto",
          x: e.clientX,
          y: e.clientY,
          stagger: 0.15,
          ease: "none",
        });
      });
    }, wrap);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrap}>
      <span className="absolute left-0 top-0">✨</span>
      <span className="absolute left-0 top-0">🎉</span>
      <span className="absolute left-0 top-0">🎊</span>
      <span className="absolute left-0 top-0">🎈</span>
    </div>
  );
};

export default Cursor;
