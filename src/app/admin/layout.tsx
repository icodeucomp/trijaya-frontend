import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { CookiesProvider } from "next-client-cookies/server";

import "./globals.css";

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

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <CookiesProvider>
          <Toaster position="bottom-center" />
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
}
