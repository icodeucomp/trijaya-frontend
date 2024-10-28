import { Projects } from "@/dashboards";

export default function ProjectDashboard({ params }: { params: { slug: string } }) {
  return <Projects slug={params.slug} />;
}
