"use client";
import Image from "next/image";
import SectionTitle from "../components/section-title";
import s from "./contact.module.css";
import Github from "@images/github.svg";
import Linkedin from "@images/linkedin.svg";
import Email from "@images/email.svg";
import { mergeClassname } from "@utils/merge-classname";
import Button from "@components/button";

const Contact = () => {
  return (
    <div className={s.wrapper}>
      <SectionTitle number="🤝" title="Connect" />
      <div className={s.content}>
        Let&apos; connect! Say hello and have a chat. →
      </div>
      <div className={s.connect}>
        <Button
          onClick={() => {
            window.open("mailto:urwatilwutsqo16@gmail.com");
          }}
          className={mergeClassname(s.email)}
        >
          <span className="flex gap-4 items-center justify-center">
            <Image src={Email} alt="Email" width={40} height={40} />
            CONTACT ME
          </span>
        </Button>
        <Button
          onClick={() => {
            window.open("https://github.com/wutsqo");
          }}
          className={mergeClassname(s.github, s.link)}
        >
          <div>
            <Image src={Github} alt="Github" width={48} height={48} />
          </div>
        </Button>
        <Button
          onClick={() => {
            window.open("https://www.linkedin.com/in/wutsqo");
          }}
          className={mergeClassname(s.linkedin, s.link)}
        >
          <div>
            <Image src={Linkedin} alt="Github" width={48} height={48} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Contact;
