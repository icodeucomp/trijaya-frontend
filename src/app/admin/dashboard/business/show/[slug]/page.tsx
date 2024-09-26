import { ShowBusiness } from "@/dashboards";

export default function ShowBusinessDashboard({ params }: { params: { slug: string } }) {
  return <ShowBusiness slug={params.slug} />;
}
