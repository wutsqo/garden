import Glowing from "@components/glowing";
import { H1 } from "@components/mdx/headings";
import { getFeeds } from "./data";
import Feed from "./feed";

export const revalidate = 86400;

export default async function Page() {
  const { channels, lastUpdated, items } = await getFeeds();
  return (
    <main className="container bg-white py-20 border">
      <Glowing>
        <H1>Reading Feed</H1>
      </Glowing>
      <p className="mt-4 text-sm">
        Updated at{" "}
        <time dateTime={lastUpdated.toISOString()}>
          {lastUpdated.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </p>
      <Feed items={items} channels={channels} />
    </main>
  );
}
