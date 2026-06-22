"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@components/button";
import { mergeClassname } from "@utils/merge-classname";
import s from "./contact.module.css";

export interface ContactLink {
  id: string;
  label: string;
  url: string;
  iconSrc: string;
  iconAlt: string;
  variant: "email" | "github" | "linkedin" | "spotify";
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyRecent {
  item?: {
    name?: string;
    artists?: SpotifyArtist[];
  };
}

const variantClassName: Record<ContactLink["variant"], string> = {
  email: s.email,
  github: mergeClassname(s.github, s.link),
  linkedin: mergeClassname(s.linkedin, s.link),
  spotify: mergeClassname(s.spotify, s.link),
};

function ContactButton({ link, lastPlayed }: { link: ContactLink; lastPlayed?: SpotifyRecent }) {
  const isEmail = link.variant === "email";
  const isSpotify = link.variant === "spotify";
  const iconSize = isSpotify ? 48 : 36;

  return (
    <Button href={link.url} className={variantClassName[link.variant]}>
      <Image src={link.iconSrc} alt={link.iconAlt} width={iconSize} height={iconSize} unoptimized />

      {isSpotify ? (
        lastPlayed ? (
          <div className="text-left text-white">
            <div className="text-sm">Last played: </div>
            <div className="text-lg">
              {`${lastPlayed.item?.name} - `}
              {lastPlayed.item?.artists?.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        ) : (
          <div className="text-2xl text-white">{link.label}</div>
        )
      ) : (
        <span className={isEmail ? undefined : "hidden sm:block"}>{link.label}</span>
      )}
    </Button>
  );
}

export default function ContactLinks({ links }: { links: ContactLink[] }) {
  const [lastPlayed, setLastPlayed] = useState<SpotifyRecent>();

  useEffect(() => {
    fetch("/api/spotify/recent").then((res) => {
      res.json().then((data: SpotifyRecent) => {
        setLastPlayed(data);
      });
    });
  }, []);

  return (
    <div className={s.connect}>
      {links.map((link) => (
        <ContactButton key={link.id} link={link} lastPlayed={lastPlayed} />
      ))}
    </div>
  );
}
