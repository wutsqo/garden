import Link from "next/link";
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

      <Link href="/services" className={styles.buttonText}>
        <Button>Book a Consultation</Button>
      </Link>
    </div>
  );
}
