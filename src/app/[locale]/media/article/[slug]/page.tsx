import { ArticleContent } from "@/layouts/media";

export default function Article({ params }: { params: { slug: string } }) {
  return (
    <section className="overflow-x-hidden">
      <ArticleContent slug={params.slug} />
    </section>
  );
}
