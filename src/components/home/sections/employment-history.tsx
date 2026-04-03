import { getPayload } from "payload";
import config from "@payload-config";
import type { Homepage } from "@/payload.types";
import SectionTitle from "../components/section-title";
import EmploymentHistoryList from "./employment-history-list";

export default async function EmploymentHistory() {
  const payload = await getPayload({ config });
  const homepage = await payload.findGlobal({ slug: "homepage" });
  const employmentHistory: NonNullable<Homepage["employmentHistory"]> = homepage.employmentHistory ?? [];
  const hasEmploymentHistory = employmentHistory.length > 0;

  return (
    <section className="container mx-auto mt-24 px-6">
      <SectionTitle number="💼" title="Experiences" />

      {hasEmploymentHistory ? (
        <EmploymentHistoryList employmentHistory={employmentHistory} />
      ) : (
        <div className="shadow-brutalist rounded border border-dashed border-black bg-white p-6 text-sm leading-7 text-neutral-700">
          Add employment history entries in Payload under the Homepage global to populate this section.
        </div>
      )}
    </section>
  );
}
