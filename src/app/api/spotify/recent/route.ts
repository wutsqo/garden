import { NextResponse } from "next/server";
import { getSpotifyLastPlayed } from "./services";

export const revalidate = 15;

export async function GET(request: Request) {
  return NextResponse.json(await getSpotifyLastPlayed());
}
