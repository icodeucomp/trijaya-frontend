import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sector | Trijaya Berkah Mandiri",
  description: "Sector Page for PT Trijaya Berkah Mandiri",
};

export default function SectorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="overflow-x-hidden">{children}</section>;
}
