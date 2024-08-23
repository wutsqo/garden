"use client";

import { FC } from "react";
import styles from "./styles.module.css";
import { BookmarkTag } from "./interface";
import { useBookmarkContext } from "./context";

const Tag: FC<BookmarkTag> = ({ name, id }) => {
  const { setSearch } = useBookmarkContext();

  return (
    <button
      className={styles.tag}
      onClick={() => (id ? setSearch(`#${name}`) : setSearch(""))}
    >
      {name}
    </button>
  );
};

export default Tag;
