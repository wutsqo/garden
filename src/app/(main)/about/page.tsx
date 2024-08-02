import Image from "next/image";
import s from "./page.module.css";
import markdownToHtml from "@utils/markdown-to-html";
import { getAboutData, getTrackData } from "./data";
import PageTitle from "@components/page-title";

export default async function About() {
  const trackData = await getTrackData();
  const aboutData = await getAboutData();
  const content = await markdownToHtml(aboutData?.content ?? "");

  return (
    <div className={s.wrapper}>
      <PageTitle
        title="About"
        subtitle="Introducing Muhammad Urwatil Wutsqo 🌟"
      />
      <div className={s.content}>
        <div
          className={s.innerContent}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className={s.spotify}>
          <Image
            src={trackData?.item.album.images[0].url ?? ""}
            width={50}
            height={50}
            alt="album cover"
          />
          <div className={s.trackInfo}>
            <div className={s.trackName}>
              <a
                href={`https://open.spotify.com/track/${trackData?.item.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {trackData?.item.name}
              </a>
            </div>
            <div>
              <a
                href={`https://open.spotify.com/artist/${trackData?.item.artists[0].id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                {trackData?.item.artists[0].name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
