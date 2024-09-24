import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import { Layout } from "@/layouts/dashboard";

import "./globals.css";

import "ckeditor5/ckeditor5.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard | Trijaya Berkah Mandiri",
  description: "Dashboard Page for PT Trijaya Berkah Mandiri",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
