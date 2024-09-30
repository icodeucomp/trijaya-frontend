import { EditBusiness } from "@/dashboards";

export default function EditBusinessDashboard({ params }: { params: { slug: string } }) {
  return <EditBusiness slug={params.slug} />;
}
