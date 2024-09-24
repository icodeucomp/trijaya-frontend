import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media | Trijaya Berkah Mandiri",
  description: "Media Page for PT Trijaya Berkah Mandiri",
};

export default function MediaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
