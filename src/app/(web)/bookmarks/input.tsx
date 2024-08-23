"use client";

import styles from "./styles.module.css";
import { useBookmarkContext } from "./context";

const Input = () => {
  const { search, setSearch } = useBookmarkContext();

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="Search bookmarks"
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Input;
