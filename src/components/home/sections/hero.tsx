"use client";

import styles from "./hero.module.css";
import Button from "@components/button";

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.superText}>Wutsqo is an</div>
        <div className={styles.mainText}>Indie Developer</div>
        <div className={styles.subText}>
          specialized in <br />
        </div>
        <div className={styles.subtitleWrapper}>
          <span className={styles.firstHighlight}>
            Digital Product Development
          </span>
        </div>
      </div>

      <Button
        onClick={() => window.open("mailto:urwatilwutsqo16@gmail.com")}
        className={styles.buttonText}
      >
        Book a Consultation
      </Button>
    </div>
  );
}
