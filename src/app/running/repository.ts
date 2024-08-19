import axios from "axios";
import { StravaActivity } from "./interface";

async function getStats(accessToken: string) {
  const response = await axios.get(
    `https://www.strava.com/api/v3/athletes/${process.env.STRAVA_USER_ID}/stats`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}

async function getRecentRun(accessToken: string): Promise<StravaActivity> {
  const response = await axios.get(
    `https://www.strava.com/api/v3/athlete/activities?&page=1&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.find(
    (activity: { type: string }) => activity.type === "Run"
  );
}

async function getNewAccessToken(): Promise<string> {
  const response = await axios.post(
    `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${process.env.STRAVA_REFRESH_TOKEN}`
  );

  return response.data.access_token;
}

export async function getData() {
  const accessToken = await getNewAccessToken();
  const stats = getStats(accessToken);
  const recentRun = getRecentRun(accessToken);

  return Promise.all([stats, recentRun]);
}
