import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification | Trijaya Berkah Mandiri",
  description: "Certification Page for PT Trijaya Berkah Mandiri",
};

export default function CertificationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
