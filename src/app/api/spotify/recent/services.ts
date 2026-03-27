import { SpotifyResponse } from "./interface";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
  SITE_URL,
} = process.env;

const getRequiredEnv = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const fetchJson = async <T>(
  url: string,
  init?: RequestInit
): Promise<{ status: number; data: T | undefined }> => {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(5000),
  });

  if (response.status === 204) {
    return { status: response.status, data: undefined };
  }

  if (!response.ok) {
    throw new Error(`Spotify request failed with status ${response.status}`);
  }

  return { status: response.status, data: (await response.json()) as T };
};

const getAccessToken = async (): Promise<string> => {
  const authKey = Buffer.from(
    `${getRequiredEnv(SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID")}:${getRequiredEnv(
      SPOTIFY_CLIENT_SECRET,
      "SPOTIFY_CLIENT_SECRET"
    )}`
  ).toString("base64");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: getRequiredEnv(SPOTIFY_REFRESH_TOKEN, "SPOTIFY_REFRESH_TOKEN"),
    redirect_uri: `${SITE_URL ?? "http://localhost:3000"}/api/spotify-callback`,
  });

  const config: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Basic ${authKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  };

  const { data } = await fetchJson<{ access_token: string }>(
    "https://accounts.spotify.com/api/token",
    config
  );
  if (!data?.access_token) {
    throw new Error("Spotify token response is missing access_token");
  }

  return data.access_token;
};

const fetchOptions = (accessToken: string): RequestInit => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const getNowPlaying = async (
  accessToken: string
): Promise<SpotifyResponse | undefined> => {
  const { data } = await fetchJson<{
    item?: SpotifyResponse["item"];
  }>(
    "https://api.spotify.com/v1/me/player/currently-playing?market=ID",
    fetchOptions(accessToken)
  );

  if (data?.item) return { item: data.item, type: "current" };
};

const getRecentlyPlayed = async (
  accessToken: string
): Promise<SpotifyResponse | undefined> => {
  const { data } = await fetchJson<{
    items?: Array<{ track: SpotifyResponse["item"] }>;
  }>(
    "https://api.spotify.com/v1/me/player/recently-played?market=ID&limit=1",
    fetchOptions(accessToken)
  );

  if (data?.items?.[0]) return { item: data.items[0].track, type: "recent" };
};

export const getSpotifyLastPlayed = async () => {
  const accessToken = await getAccessToken();
  const nowPlaying = await getNowPlaying(accessToken);
  if (nowPlaying) return nowPlaying;
  const recentlyPlayed = await getRecentlyPlayed(accessToken);
  return recentlyPlayed;
};
