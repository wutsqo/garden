import React, { ReactElement, cloneElement } from "react";
import styles from "./index.module.css";

interface GlowingProps {
  children: ReactElement<HTMLElement> | string;
}

const Glowing: React.FC<GlowingProps> = ({ children }) => {
  if (typeof children === "string") {
    return <span className={styles.text}>{children}</span>;
  }

  return cloneElement(children, {
    className: [styles.text, children.props.className]
      .filter(Boolean)
      .join(" "),
  });
};

export default Glowing;
