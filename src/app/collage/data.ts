import axios from "axios";
import { Album, Response, Track } from "./interface";

export async function getTopTracks(): Promise<Track[]> {
  const response = await axios.get<Response>(
    "https://raw.githubusercontent.com/wutsqo/spotify/data/data/top/tracks/short_term.json"
  );

  return response.data.tracks;
}

export async function getDistinctAlbums(): Promise<Album[]> {
  const tracks = await getTopTracks();

  const albums = tracks.map((track) => track.album);
  const distinctAlbums = albums.filter(
    (album, index, self) => index === self.findIndex((t) => t.id === album.id)
  );

  return distinctAlbums;
}
