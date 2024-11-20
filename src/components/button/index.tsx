"use client";

import { mergeClassname } from "@utils/merge-classname";
import React, {
  ButtonHTMLAttributes,
  FC,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import s from "./index.module.css";
import Link from "next/link";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children: ReactNode;
  href?: string;
};

const Button: FC<Props> = ({ children, className, onClick, href }) => {
  const classNames = mergeClassname(s.button, className);
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const tlClick = useRef<gsap.core.Timeline | null>(null);
  const tlHover = useRef<gsap.core.Timeline | null>(null);
  const onClickHandler = () => {
    tlClick.current?.restart();
    onClick?.();
  };

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

  if (href) {
    const LinkTag = href.startsWith("http") ? "a" : Link;
    return (
      <LinkTag
        href={href}
        className={classNames}
        prefetch
        onClick={onClickHandler}
        onMouseEnter={() => tlHover.current?.play(0)}
        ref={ref as RefObject<HTMLAnchorElement>}
      >
        <span className={s.children}>{children}</span>
      </LinkTag>
    );
  }

  return (
    <button
      className={classNames}
      onClick={onClickHandler}
      onMouseEnter={() => tlHover.current?.play(0)}
      ref={ref as RefObject<HTMLButtonElement>}
    >
      <span className={s.children}>{children}</span>
    </button>
  );
};

export default Button;
