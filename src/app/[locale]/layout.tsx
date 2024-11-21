import type { Metadata } from "next";

import { GoogleAnalytics } from "@next/third-parties/google";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Poppins } from "next/font/google";

import { Toaster } from "react-hot-toast";
import { Footer, Header } from "@/layouts";
import Script from "next/script";

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
  title: "Trijaya Berkah Mandiri",
  description: "This is official website from PT Trijaya Berkah Mandiri",
  icons: {
    icon: "/logo-company.png",
  },
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className} flex flex-col min-h-screen overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <Toaster position="bottom-center" />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
      <Script id="google-analytics-tbm" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-HE7VW56TFX');      
        `}
      </Script>
      <GoogleAnalytics gaId="G-HE7VW56TFX" />
    </html>
  );
}
