import { getFeeds } from "./data";
import Feed from "./feed";
import PageTitle from "@components/page-title";

export const revalidate = 86400;

export default async function Page() {
  const { channels, lastUpdated, items } = await getFeeds();
  const updatedAt = new Date(lastUpdated).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main className="container bg-white py-20 border">
      <PageTitle title="Reading Feed" subtitle={updatedAt} xl />
      <Feed items={items} channels={channels} />
    </main>
  );
}
