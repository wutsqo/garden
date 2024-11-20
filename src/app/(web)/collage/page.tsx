import PageTitle from "@components/page-title";
import Image from "next/image";
import { getDistinctAlbums } from "./data";
import s from "./page.module.css";

export const revalidate = 86400;

export default async function Collage() {
  const data = await getDistinctAlbums();

  return (
    <div className={s.wrapper}>
      <PageTitle
        title="Collage 🎵"
        subtitle="My top albums based on the last 4 weeks listening data from Spotify."
      />
      <div className={s.collage}>
        {data.map((album) => (
          <div key={album.id} className={s.collageItem}>
            <Image
              src={album.images[0].url}
              alt={album.name}
              fill
              title={album.name}
            />
          </div>
        ))}
      </div>
      <div className={s.lastUpdated}>
        Last updated: {new Date().toLocaleString("en-US")}
      </div>
    </div>
  );
}
