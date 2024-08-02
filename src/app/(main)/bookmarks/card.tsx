import { FC } from "react";
import { BookmarkItem } from "./interface";
import styles from "./styles.module.css";

const BookmarkCard: FC<BookmarkItem> = ({ title, comment, date, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className={styles.bookmark}>
        <h2 className={styles.bookmarkTitle}>{title}</h2>
        <div className={styles.bookmarkComment}>{comment}</div>
        <div className={styles.bookmarkDate}>
          {url} <br />
          Bookmarked on{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </a>
  );
};

export default BookmarkCard;
