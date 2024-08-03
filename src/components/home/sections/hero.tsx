"use client";

import styles from "./hero.module.css";
import Button from "@components/button";

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.superText}>Wutsqo is a</div>
        <div className={styles.mainText}>Creative Developer</div>
        <div className={styles.subText}>
          specialized in <br />
        </div>
        <div className={styles.subtitleWrapper}>
          <span className={styles.firstHighlight}>UI/UX Design</span> &{" "}
          <span className={styles.secondHighlight}>Web Development</span>
        </div>
      </div>

      <Button
        onClick={() => window.open("mailto:urwatilwutsqo16@gmail.com")}
        className={styles.buttonText}
      >
        OPEN FOR FREELANCE‼
      </Button>
    </div>
  );
}
