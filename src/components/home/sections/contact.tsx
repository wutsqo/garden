"use client";

import Image from "next/image";
import SectionTitle from "../components/section-title";
import s from "./contact.module.css";
import Github from "@images/github.svg";
import Linkedin from "@images/linkedin.svg";
import Email from "@images/email.svg";
import Spotify from "@images/spotify.svg";
import { mergeClassname } from "@utils/merge-classname";
import Button from "@components/button";
import { useEffect, useState } from "react";

const Contact = () => {
  const [lastPlayed, setLastPlayed] = useState<any>();

  useEffect(() => {
    fetch("/api/spotify/recent").then((res) => {
      res.json().then((data) => {
        setLastPlayed(data);
      });
    });
  }, []);

  return (
    <div className="container mt-24 pb-32">
      <SectionTitle number="🤝" title="Connect" />
      <div className={s.content}>Let&apos; connect! Say hello and have a chat. →</div>
      <div className={s.connect}>
        <Button href="mailto:urwatilwutsqo16@gmail.com" className={mergeClassname(s.email)}>
          <Image src={Email} alt="Email" width={36} height={36} />
          Email
        </Button>
        <Button href="https://github.com/wutsqo" className={mergeClassname(s.github, s.link)}>
          <Image src={Github} alt="Github" width={36} height={36} />
          <span className="hidden sm:block">GitHub</span>
        </Button>
        <Button href="https://www.linkedin.com/in/wutsqo" className={mergeClassname(s.linkedin, s.link)}>
          <Image src={Linkedin} alt="Github" width={36} height={36} />
          <span className="hidden sm:block">LinkedIn</span>
        </Button>
        <Button href="https://open.spotify.com/user/urwatilwutsqo" className={mergeClassname(s.spotify, s.link)}>
          <Image src={Spotify} alt="Spotify" width={48} height={48} />
          {lastPlayed ? (
            <div className="text-left text-white">
              <div className="text-sm">Last played: </div>
              <div className="text-lg">
                {`${lastPlayed?.item?.name} - `}
                {lastPlayed?.item?.artists.map((artist: any) => artist.name).join(", ")}
              </div>
            </div>
          ) : (
            <div className="text-2xl text-white">Spotify</div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
