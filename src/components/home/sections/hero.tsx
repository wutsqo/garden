"use client";

import Image from "next/image";
import styles from "./hero.module.css";
import Button from "@components/button";
import Avatar from "@images/avatar.png";

export default function Hero() {
  return (
    <div className="px-4 py-28 text-3xl sm:text-4xl font-medium md:px-8 leading-snug">
      <div className="flex flex-col ">
        <div className="mb-8">Wutsqo is a</div>
        <div className={styles.mainText}>Creative Developer</div>
        <div className="text-2xl mt-8">
          specialized in <br />
        </div>
        <div className="mt-4">
          <span className="text-magenta-cerise">UI/UX Design</span> &{" "}
          <span className="text-yellow-beer">Web Development</span>
        </div>
      </div>

      <Button
        onClick={() => window.open("mailto:urwatilwutsqo16@gmail.com")}
        className="text-base block mt-12"
      >
        OPEN FOR FREELANCE‼
      </Button>
    </div>
  );
}
