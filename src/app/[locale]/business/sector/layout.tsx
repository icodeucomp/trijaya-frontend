import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Sector | Trijaya Berkah Mandiri",
  description: "Business Sector Page for PT Trijaya Berkah Mandiri",
};

export default function BusinessSectorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
