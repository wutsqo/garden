"use client";

import { FC } from "react";
import { BookmarkItem } from "./interface";
import styles from "./styles.module.css";
import { useBookmarkContext } from "./context";
import BookmarkCard from "./card";

interface Props {
  bookmarks: BookmarkItem[];
  loading?: boolean;
}

const Content: FC<Props> = ({ bookmarks, loading }) => {
  const { search } = useBookmarkContext();
  return (
    <div className={styles.content}>
      {loading ? (
        <>
          <div className={styles.loadingCard}>
            <div className={styles.loadingCardTitle} />
            <div className={styles.loadingCardComment} />
          </div>
          <div className={styles.loadingCard}>
            <div className={styles.loadingCardTitle} />
            <div className={styles.loadingCardComment} />
          </div>
          <div className={styles.loadingCard}>
            <div className={styles.loadingCardTitle} />
            <div className={styles.loadingCardComment} />
          </div>
          <div className={styles.loadingCard}>
            <div className={styles.loadingCardTitle} />
            <div className={styles.loadingCardComment} />
          </div>
        </>
      ) : null}
      {bookmarks
        .filter(
          (bookmark) =>
            bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
            bookmark.tags.some((tag) =>
              tag.name.toLowerCase().includes(search.slice(1).toLowerCase())
            )
        )
        .map((bookmark) => (
          <BookmarkCard key={bookmark.id} {...bookmark} />
        ))}
    </div>
  );
};

export default Content;
