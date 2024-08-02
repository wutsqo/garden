import { getDocumentBySlug } from "outstatic/server";
import { getSpotifyLastPlayed } from "../../api/spotify/recent/services";

export async function getAboutData() {
  return getDocumentBySlug("pages", "about", ["publishedAt", "content"]);
}

export async function getTrackData() {
  return getSpotifyLastPlayed();
}
