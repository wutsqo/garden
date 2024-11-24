"use client";

import { mergeClassname } from "@utils/merge-classname";
import React, { ButtonHTMLAttributes, FC, ReactNode, useCallback } from "react";
import s from "./index.module.css";
import { motion, TapHandlers, useAnimate } from "framer-motion";
import Link from "next/link";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children: ReactNode;
  href?: string;
};

const Button: FC<Props> = ({ children, className, onClick, href }) => {
  const [scope, animate] = useAnimate();
  const classNames = mergeClassname(s.button, className);
  const tapHandlers: TapHandlers = {
    whileTap: {
      translateX: 2,
      translateY: 2,
      boxShadow: "none",
      transition: { duration: 0.1 },
    },
  };
  const onButtonHover = useCallback(() => {
    animate([
      [".letter", { y: "-100%" }, { duration: 0.15 }],
      [".letter", { y: "100%" }, { duration: 0 }],
      [".letter", { y: 0 }, { duration: 0.15 }],
    ]);
  }, [animate]);
  const renderContent = () => (
    <span className="letter w-full h-full flex justify-center items-center gap-4 px-2 font-medium">
      {children}
    </span>
  );
  if (!href) {
    return (
      <motion.button
        ref={scope}
        className={classNames}
        onClick={onClick}
        onMouseEnter={onButtonHover}
        {...tapHandlers}
      >
        {renderContent()}
      </motion.button>
    );
  }
  const externalHrefs = ["mailto", "tel", "http"];
  const isExternal = externalHrefs.some((ext) => href.startsWith(ext));
  if (isExternal) {
    return (
      <motion.a
        ref={scope}
        href={href}
        className={classNames}
        onClick={onClick}
        onMouseEnter={onButtonHover}
        {...tapHandlers}
        target="_blank"
        rel="noopener noreferrer"
      >
        {renderContent()}
      </motion.a>
    );
  }
  const NextLink = motion.create(Link);
  return (
    <NextLink
      ref={scope}
      href={href}
      className={classNames}
      onClick={onClick}
      onMouseEnter={onButtonHover}
      {...tapHandlers}
    >
      {renderContent()}
    </NextLink>
  );
};

export default Button;
