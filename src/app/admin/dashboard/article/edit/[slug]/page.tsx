import { EditArticle } from "@/dashboards";

export default function EditArticleDashboard({ params }: { params: { slug: string } }) {
  return <EditArticle slug={params.slug} />;
}
