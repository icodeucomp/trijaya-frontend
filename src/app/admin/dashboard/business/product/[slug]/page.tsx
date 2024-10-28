import { Products } from "@/dashboards";

export default function ProductDashboard({ params }: { params: { slug: string } }) {
  return <Products slug={params.slug} />;
}
