import { getFeeds } from "./data";
import PageDescription from "./description";
import Feed from "./feed";
import PageTitle from "@components/page-title";

export const revalidate = 3600;

export default async function Page() {
  const { channels, lastUpdated, items } = await getFeeds();
  const updatedAt = new Date(lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main className="container mx-auto px-6 border-x border-gray-200 bg-white py-20">
      <PageTitle title="RSS Feed" xl />
      <PageDescription channels={channels} updatedAt={updatedAt} />
      <Feed items={items} channels={channels} />
    </main>
  );
}
