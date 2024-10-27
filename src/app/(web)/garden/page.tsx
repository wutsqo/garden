import PageTitle, { PageTitleVariant } from "@components/page-title";
import Island from "./components/island";
import { getDocuments } from "@utils/collections";
import { GardenContent } from "./interface";

export default async function Page() {
  const contents = await getDocuments<GardenContent>("garden", {
    filter: {
      isPublished: "true",
    },
  });

  return (
    <main className="container py-20 flex flex-col gap-6 max-w-screen-2xl bg-white">
      <PageTitle
        title="The Garden"
        subtitle="A collection of thoughts, notes, and ideas that are growing over time."
        variant={PageTitleVariant.Default}
      />
      <div className="columns-2xs gap-8">
        {contents.map(({ content, metadata, slug }) => (
          <Island key={slug} metadata={metadata} />
        ))}
      </div>
    </main>
  );
}
