import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article | Trijaya Berkah Mandiri",
  description: "Article Page for PT Trijaya Berkah Mandiri",
};

export default function ArticleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="overflow-x-hidden">{children}</section>;
}
