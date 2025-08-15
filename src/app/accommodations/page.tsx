import { AccommodationsUI } from "@/components/AccommodationsUI";
import { loadDisabilityData } from "@/utils/loadDisabilities";

export default async function AccommodationsPage() {
  const disabilities = await loadDisabilityData();

  return <AccommodationsUI disabilities={disabilities} />;
}
