import { Projects } from "@/layouts/business";

export default function Project({ params }: { params: { slug: string } }) {
  return (
    <section className="overflow-x-hidden">
      <Projects slug={params.slug} />
    </section>
  );
}
