import { ArticleContent, MoreArticles } from "@/layouts/media";

export default function Article({ params }: { params: { slug: string } }) {
  return (
    <>
      <ArticleContent slug={params.slug} />
      <MoreArticles />
    </>
  );
}
