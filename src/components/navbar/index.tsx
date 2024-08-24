"use client";

import Link from "next/link";
import { NAVIGATIONS } from "./config";
import { mergeClassname } from "@utils/merge-classname";
import useScrollPosition from "@hooks/use-scroll-position";
import styles from "./index.module.css";
import { COLOR_PALETTE } from "@utils/color";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const colors = Object.values(COLOR_PALETTE);
  const pathName = usePathname();
  const toggleRef = useRef<HTMLInputElement>(null);

  const onNavClick = () => {
    if (toggleRef.current) toggleRef.current.checked = false;
  };

  return (
    <nav
      className={mergeClassname(
        styles.nav,
        scrollPosition > 0 ? styles.navInverted : ""
      )}
    >
      <div className={styles.logo}>
        <Link href="/" onClick={onNavClick}>
          <span style={{ color: colors.at(0) }}>W</span>
          <span style={{ color: colors.at(1) }}>W</span>
          <span style={{ color: colors.at(3) }}>WUTSQO</span>
        </Link>
      </div>
      <div className={styles.linksWrapper}>
        <label className={styles.burger}>
          <input type="checkbox" ref={toggleRef} />
          <Bars3Icon className={styles.iconOpen} />
          <XMarkIcon className={styles.iconClose} />
        </label>
        <div className={styles.links}>
          {NAVIGATIONS.map((navigation, i) => (
            <Link
              className={mergeClassname(
                styles.link,
                pathName === navigation.path ? styles.active : ""
              )}
              key={navigation.path}
              href={navigation.path}
              style={{
                color: colors[i % colors.length],
              }}
              onClick={onNavClick}
            >
              {navigation.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
