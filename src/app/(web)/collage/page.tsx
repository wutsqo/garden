import Image from "next/image";
import { getDistinctAlbums } from "./data";
import PageTitle from "@components/page-title";

export const revalidate = 86400;

export default async function Collage() {
  const data = await getDistinctAlbums();

  return (
    <div className="animate-fade-in-up animation-delay-[300ms] relative z-50 grid grid-cols-2 bg-black opacity-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <div className="col-span-2 flex flex-col items-start justify-center p-8">
        <PageTitle
          title="Collage"
          subtitle="Top albums based on recent Spotify listening history"
          subtitleProps={{ className: "text-white mb-6" }}
        />
      </div>
      {data.slice(0, 34).map((album) => (
        <div key={album.id} className="relative aspect-square">
          <Image src={album.images[0].url} alt={album.name} fill title={album.name} />
        </div>
      ))}
    </div>
  );
}
