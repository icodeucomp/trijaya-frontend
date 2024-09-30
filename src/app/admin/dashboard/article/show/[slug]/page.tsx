import { ShowArticle } from "@/dashboards";

export default function ShowArticleDashboard({ params }: { params: { slug: string } }) {
  return <ShowArticle slug={params.slug} />;
}
