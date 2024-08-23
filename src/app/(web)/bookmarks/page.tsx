import PageTitle from "@components/page-title";
import styles from "./styles.module.css";
import { BookmarkContextProvider } from "./context";
import Input from "./input";
import { getBookmarks } from "./data";
import Tag from "./tag";
import Content from "./content";

export default async function Bookmarks() {
  const bookmarks = await getBookmarks();

  const tags = bookmarks
    .map((bookmark) => bookmark.tags)
    .flat()
    .map((tag) => ({
      id: tag.id,
      name: tag.name,
    }))
    .filter(
      (tag, index, self) => self.findIndex((t) => t.id === tag.id) === index
    );

  return (
    <BookmarkContextProvider>
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
              {tags.map((tag) => (
                <Tag key={tag.id} {...tag} />
              ))}
            </div>
          </div>
          <Content bookmarks={bookmarks} />
        </main>
      </div>
    </BookmarkContextProvider>
  );
}
