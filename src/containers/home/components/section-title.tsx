import { FC } from "react";
import styles from "./section-title.module.css";
import { mergeClassname } from "@utils/merge-classname";

interface Props {
  number: string;
  title: string;
  description?: string;
  darkMode?: boolean;
}

const SectionTitle: FC<Props> = ({ number, title, darkMode }) => {
  return (
    <div
      className={mergeClassname(styles.container, darkMode ? styles.dark : "")}
    >
      <div className={styles.number}>{number}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default SectionTitle;
