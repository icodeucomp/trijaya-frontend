import { Projects } from "@/layouts";
import { Description, ProductSector } from "@/layouts/business";

export default function BusinessSector({ params }: { params: { slug: string } }) {
  return (
    <section className="overflow-x-hidden">
      <Description slug={params.slug} />
      <Projects />
      <ProductSector slug={params.slug} />
    </section>
  );
}
