import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Poppins } from "next/font/google";

import { Toaster } from "react-hot-toast";
import { Footer, Header } from "@/layouts";

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
  title: "Home | Trijaya Berkah Mandiri",
  description: "Home Page for PT Trijaya Berkah Mandiri",
  icons: {
    icon: "/logo-company.png",
  },
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className} overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <Toaster position="bottom-center" />
          <Header />
          <div className="mt-20">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
