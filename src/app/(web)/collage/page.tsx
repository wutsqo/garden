import Image from "next/image";
import { getDistinctAlbums } from "./data";
import PageTitle from "@components/page-title";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 86400;

export default async function Collage() {
  const data = await getDistinctAlbums();

  return (
    <div className="relative z-10 grid grid-cols-2 bg-black md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <div className="col-span-2 flex flex-col items-start justify-center p-8">
        <PageTitle
          title="Collage"
          subtitle="Top albums based on recent Spotify listening history"
          subtitleProps={{ className: "text-white mb-6" }}
        />
      </div>
      {data.slice(0, 34).map((album, i) => (
        <div
          key={album.id}
          className="animate-fade-in group relative aspect-square overflow-hidden opacity-0"
          style={{
            animationDelay: `${Math.random() * 1000}ms`,
          }}
        >
          <Image
            src={album.images[0].url}
            alt={album.name}
            fill
            title={album.name}
            className="object-cover object-center duration-300 group-hover:scale-105"
          />
          <div className="absolute right-0 left-0 flex h-full w-full flex-col justify-between bg-black/90 p-4 opacity-0 group-hover:opacity-100">
            <div>
              <div className="line-clamp-2 text-lg font-medium text-white sm:line-clamp-3 sm:text-xl">
                {album.name}
              </div>
              <div className="text-yellow-beer line-clamp-2 text-base sm:text-lg">
                {album.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
            <div>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Listen on Spotify
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
