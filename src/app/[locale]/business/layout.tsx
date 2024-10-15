import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business | Trijaya Berkah Mandiri",
  description: "Business Page for PT Trijaya Berkah Mandiri",
};

export default function BusinessLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="overflow-x-hidden">{children}</section>;
}
