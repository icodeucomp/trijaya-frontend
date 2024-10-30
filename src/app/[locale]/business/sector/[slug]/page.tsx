import { Description, ProductSector, ProjectSector } from "@/layouts/business";

export default function BusinessSector({ params }: { params: { slug: string } }) {
  return (
    <section className="overflow-x-hidden">
      <Description slug={params.slug} />
      <ProjectSector slug={params.slug} />
      <ProductSector slug={params.slug} />
    </section>
  );
}
