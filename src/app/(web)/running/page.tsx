import PageTitle from "@components/page-title";
import s from "./style.module.css";
import { getData } from "./repository";
import Image from "next/image";
import StravaLogo from "./strava.svg";
import SamsungHealthLogo from "./shealth.svg";
import RecentRun from "./recent-run";

export const revalidate = 300;

export default async function GalleryPage() {
  const data = await getData();
  const stats = data[0];
  const recentRun = data[1];

  return (
    <div className={s.root}>
      <PageTitle title="Running 🏃‍♂️" />
      <div className={s.pageContent}>
        <h2 className={s.sectionTitle}>Stats (2024)</h2>
        <div className={s.sectionContent}>
          <div className={s.stats}>
            <div className={s.stat}>
              <div className={s.statNumber}>
                {stats.ytd_run_totals.count.toFixed(0)}
              </div>
              <div className={s.statLabel}>
                <div className={s.statLabelUnit}>x</div>
                runs
              </div>
            </div>
            <div className={s.stat}>
              <div className={s.statNumber}>
                {(stats.ytd_run_totals.distance / 1000).toFixed(0)}
              </div>
              <div className={s.statLabel}>
                <div className={s.statLabelUnit}>km</div>
                distance reached
              </div>
            </div>
            <div className={s.stat}>
              <div className={s.statNumber}>
                {(stats.ytd_run_totals.moving_time / 60 / 60).toFixed(0)}
              </div>
              <div className={s.statLabel}>
                <div className={s.statLabelUnit}>h</div>
                moving time
              </div>
            </div>
          </div>
        </div>
        <h2 className={s.sectionTitle}>
          {stats.ytd_run_totals.distance / 1000 >= 200
            ? "🎉 Goal reached!"
            : "Goal"}{" "}
          (200 km)
        </h2>
        <div className={s.sectionContent}>
          <div className={s.progressBar}>
            <div
              className={s.progressBarFill}
              style={{
                width: `${(stats.ytd_run_totals.distance / 1000 / 200) * 100}%`,
              }}
            ></div>
          </div>
          <div className={s.progressBarLabel}>
            {(stats.ytd_run_totals.distance / 1000).toFixed(0)}/200 km reached
          </div>
        </div>
        <h2 className={s.sectionTitle}>Recent Run</h2>
        <div className={s.sectionContent}>
          <RecentRun recentRun={recentRun} />
        </div>
        <div className={s.pageHeader}>
          <div className="">Powered by</div>
          <Image src={StravaLogo} height={16} width={80} alt="Strava" /> |{" "}
          <Image
            src={SamsungHealthLogo}
            height={16}
            width={128}
            alt="Samsung Health"
          />
        </div>
      </div>
    </div>
  );
}
