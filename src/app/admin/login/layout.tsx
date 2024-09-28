import type { Metadata } from "next";

import { Poppins } from "next/font/google";

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
  title: "Login",
  description: "Login Page for PT Trijaya Berkah Mandiri",
};

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
