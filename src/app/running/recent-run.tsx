import { FC } from "react";
import { StravaActivity } from "./interface";
import s from "./style.module.css";

interface Props {
  recentRun?: StravaActivity;
}

const RecentRun: FC<Props> = ({ recentRun }) => {
  if (!recentRun) return <div>There are no recent runs to display.</div>;

  const movingTimeHours = Math.floor(recentRun?.moving_time / 60 / 60);
  const movingTimeMinutes =
    Math.floor((recentRun?.moving_time / 60 / 60) * 60) % 60;
  const movingTimeSeconds =
    Math.floor((recentRun?.moving_time / 60 / 60) * 60 * 60) % 60;

  const calculatePace = (distanceInKm: number, timeInSeconds: number) => {
    const pace = timeInSeconds / distanceInKm;
    const paceMinutes = Math.floor(pace / 60);
    const paceSeconds = Math.floor(pace - paceMinutes * 60);

    return `${paceMinutes}:${paceSeconds}`;
  };

  return (
    <div className={s.recentRun}>
      <div className={s.recentRunMap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`
        https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path(${encodeURIComponent(
          recentRun.map.summary_polyline
        )})/auto/800x450?access_token=${
            process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
          }
      `}
          alt="map"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className={s.recentRunContent}>
        <div className={s.recentRunTitle}>{recentRun.name}</div>
        <div>
          {new Date(recentRun.start_date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className={s.recentRunStats}>
          <div className={s.recentRunStat}>
            <div className={s.recentRunStatNumber}>
              {(recentRun.distance / 1000).toFixed(2)}
              <span className={s.recentRunStatNumberDecimal}>km</span>
            </div>
          </div>
          <div className={s.recentRunStat}>
            <div className={s.recentRunStatNumber}>
              {movingTimeHours ? (
                <>
                  {movingTimeHours}
                  <span className={s.recentRunStatNumberDecimal}>h</span>
                </>
              ) : null}
              {movingTimeMinutes ? (
                <>
                  {movingTimeMinutes}
                  <span className={s.recentRunStatNumberDecimal}>m</span>
                </>
              ) : null}
              {movingTimeSeconds ? (
                <>
                  {movingTimeSeconds}
                  <span className={s.recentRunStatNumberDecimal}>s</span>
                </>
              ) : null}
            </div>
          </div>
          <div className={s.recentRunStat}>
            <div className={s.recentRunStatNumber}>
              {calculatePace(recentRun.distance / 1000, recentRun.moving_time)}
              <span className={s.recentRunStatNumberDecimal}>/km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentRun;
