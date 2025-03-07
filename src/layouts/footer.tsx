"use client";

import { Link } from "@/i18n/routing";

import { Container, Img, Motion } from "@/components";

import { useTranslations } from "next-intl";

import { FooterLists } from "@/static";

import { MdCall, MdEmail } from "react-icons/md";

export const Footer = () => {
  const t = useTranslations("footer");

  const footerLists = FooterLists();
  return (
    <footer className="mt-auto overflow-hidden bg-primary">
      <Container className="flex justify-between gap-8 py-8 text-light">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.4} className="flex-1 space-y-4">
          <Link href="/" className="space-y-1">
            <Img className="size-10 sm:size-12 md:size-14" src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" />
            <h1 className="text-sm sm:text-base md:text-xl">PT Trijaya Berkah Mandiri</h1>
          </Link>
          <h4 className="text-lg font-semibold sm:text-xl md:text-2xl">{t("description")}</h4>
          <p className="text-sm">Jl. Bhayangkara No.136B, Kota Serang-Banten 42118</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="p-2 rounded-full bg-light">
                <MdCall className="fill-primary" />
              </span>
              <span>0254 - 7932385</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="p-2 rounded-full bg-light">
                <MdEmail className="fill-primary" />
              </span>
              <span>tbm.srg@gmail.com</span>
            </div>
          </div>
          <h5 className="text-sm">© Copyright PT Trijaya Berkah Mandiri</h5>
        </Motion>
        <Motion
          tag="div"
          initialX={40}
          animateX={0}
          duration={0.4}
          delay={0.4}
          className="flex-1 hidden grid-cols-1 gap-8 mt-4 sm:grid lg:grid-cols-2 xl:grid-cols-3"
        >
          {footerLists?.map((footer, i) => (
            <div key={i} className="space-y-2">
              <Link href={footer.pathUrl} className="block">
                <h5 className="font-semibold">{footer.title}</h5>
              </Link>
              <menu className="space-y-2">
                {footer.content?.map((field, j) => (
                  <Link key={j} className="block" href={footer.pathUrl + field.pathUrl}>
                    <p className="text-sm">{field.title}</p>
                  </Link>
                ))}
              </menu>
            </div>
          ))}
        </Motion>
      </Container>
    </footer>
  );
};
