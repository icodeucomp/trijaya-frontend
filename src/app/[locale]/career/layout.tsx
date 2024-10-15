import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career | Trijaya Berkah Mandiri",
  description: "Career Page for PT Trijaya Berkah Mandiri",
};

export default function CareerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="overflow-x-hidden">{children}</section>;
}
