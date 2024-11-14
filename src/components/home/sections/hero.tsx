import Link from "next/link";
import styles from "./hero.module.css";
import Button from "@components/button";

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <span>Wutsqo is a </span>
        <span className={styles.mainText} style={{ whiteSpace: "nowrap" }}>
          Creative Developer
        </span>
        <span>
          {" "}
          who makes beautiful and functional digital products.
        </span>
      </div>

      <Link href="/services" className={styles.buttonText}>
        <Button>See My Services</Button>
      </Link>
    </div>
  );
}
