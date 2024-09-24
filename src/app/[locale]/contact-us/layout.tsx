import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Trijaya Berkah Mandiri",
  description: "Contact Us Page for PT Trijaya Berkah Mandiri",
};

export default function ContactUsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
