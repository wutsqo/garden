import axios from "axios";
import { SpotifyResponse } from "./interface";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
  SITE_URL,
} = process.env;

const getAccessToken = async (): Promise<string> => {
  const authKey = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const body = {
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
    redirect_uri: `${SITE_URL}/api/spotify-callback`,
  };

  const config = {
    headers: {
      Authorization: `Basic ${authKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    body,
    config
  );
  return data.access_token;
};

const axiosOptions = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const getNowPlaying = async (
  accessToken: string
): Promise<SpotifyResponse | undefined> => {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing?market=ID",
    axiosOptions(accessToken)
  );

  if (data.item) return { item: data.item, type: "current" };
};

const getRecentlyPlayed = async (
  accessToken: string
): Promise<SpotifyResponse | undefined> => {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/me/player/recently-played?market=ID&limit=1",
    axiosOptions(accessToken)
  );

  if (data.items[0]) return { item: data.items[0].track, type: "recent" };
};

export const getSpotifyLastPlayed = async () => {
  const accessToken = await getAccessToken();
  const nowPlaying = await getNowPlaying(accessToken);
  if (nowPlaying) return nowPlaying;
  const recentlyPlayed = await getRecentlyPlayed(accessToken);
  return recentlyPlayed;
};
