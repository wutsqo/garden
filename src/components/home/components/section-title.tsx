import { FC } from "react";
import styles from "./section-title.module.css";

interface Props {
  number: string;
  title: string;
}

const SectionTitle: FC<Props> = ({ number, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default SectionTitle;
