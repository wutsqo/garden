import { mergeClassname } from "@utils/merge-classname";
import s from "./style.module.css";
import PageTitle from "@components/page-title";

export default function Loading() {
  return (
    <main className={s.wrapper}>
      <PageTitle
        title="Library 📚"
        subtitle="A collection of books that I have read, am reading, or want to read."
      />
      <div className={s.books}>
        <div className={s.book}>
          <div className={mergeClassname(s.cover, "animate-pulse")}></div>
        </div>

        <div className={s.book}>
          <div className={mergeClassname(s.cover, "animate-pulse")}></div>
        </div>

        <div className={s.book}>
          <div className={mergeClassname(s.cover, "animate-pulse")}></div>
        </div>

        <div className={s.book}>
          <div className={mergeClassname(s.cover, "animate-pulse")}></div>
        </div>
      </div>
    </main>
  );
}
