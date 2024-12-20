import styles from "./hero.module.css";
import Button from "@components/button";
import Glowing from "@components/glowing";

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <span>Wutsqo is a </span>
        <Glowing>
          <span>Creative Developer</span>
        </Glowing>
        <span> who makes beautiful and functional digital products.</span>
      </div>

      <Button href="/services" className={styles.buttonText}>
        See My Services
      </Button>
    </div>
  );
}
