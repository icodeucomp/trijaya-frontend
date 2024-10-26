import { Products } from "@/layouts/business";

export default function Product({ params }: { params: { slug: string } }) {
  return <Products slug={params.slug} />;
}
