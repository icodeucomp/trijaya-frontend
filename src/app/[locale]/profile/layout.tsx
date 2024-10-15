import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Trijaya Berkah Mandiri",
  description: "Profile Page for PT Trijaya Berkah Mandiri",
};

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className="overflow-x-hidden">{children}</section>;
}
