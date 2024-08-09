"use client";

import Link from "next/link";
import { NAVIGATIONS } from "./config";
import { mergeClassname } from "@utils/merge-classname";
import useScrollPosition from "@hooks/use-scroll-position";
import styles from "./index.module.css";
import { COLOR_PALETTE } from "@utils/color";

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const colors = Object.values(COLOR_PALETTE);

  return (
    <nav
      className={mergeClassname(
        styles.nav,
        scrollPosition > 0 ? styles.navInverted : ""
      )}
    >
      <div className={styles.logo}>
        <Link href="/">
          <span style={{ color: colors.at(0) }}>W</span>
          <span style={{ color: colors.at(1) }}>W</span>
          <span style={{ color: colors.at(3) }}>WUTSQO</span>
        </Link>
      </div>
      <div className={styles.links}>
        {NAVIGATIONS.map((navigation, i) => (
          <Link
            className={styles.link}
            key={navigation.path}
            href={navigation.path}
            style={{
              color: colors[i % colors.length],
            }}
          >
            {navigation.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
