import PageTitle from "@components/page-title";
import styles from "./styles.module.css";
import Input from "./input";
import Tag from "./tag";
import Content from "./content";

export default function Loading() {
  return (
    <div className={styles.outerWrapper}>
      <main className={styles.wrapper}>
        <div className={styles.header}>
          <PageTitle
            title="Bookmarks"
            subtitle="Articles and videos that I found interesting."
          />
          <Input />
          <div className={styles.tagWrapper}>
            <Tag name="All" id="" />
          </div>
        </div>
        <Content bookmarks={[]} loading />
      </main>
    </div>
  );
}
