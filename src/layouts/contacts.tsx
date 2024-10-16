import { Button, Container, Form, Img, Motion } from "@/components";

import { call, email, location, workshop } from "@/icons";
import { useTranslations } from "next-intl";

import { FaWhatsapp } from "react-icons/fa6";

export const Contacts = () => {
  const t = useTranslations("contact-us");

  return (
    <Container id="contact" className="py-10 space-y-10 sm:py-16 md:py-20 md:space-y-12">
      <Motion tag="div" initialY={-40} animateY={0} duration={0.3} className="space-y-2 text-center">
        <h3 className="heading">{t("head.title")}</h3>
        <p className="subheading">{t("head.description")}</p>
      </Motion>
      <div className="flex flex-col justify-between gap-12 md:gap-6 lg:gap-20 md:flex-row">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} className="flex-1 space-y-4 sm:space-y-8">
          <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl text-primary">{t("left-side.title")}</h3>
          <menu className="space-y-2">
            <li className="flex items-center gap-3 text-sm sm:text-base">
              <Img src={location} alt="icon location" className="min-w-10 aspect-square" /> Jl.Bhayangkara No.136B, Kota Serang-Banten 42118
            </li>
            <li className="flex items-center gap-3 text-sm sm:text-base">
              <Img src={workshop} alt="icon workshop" className="min-w-10 aspect-square" /> Jl. Raya Serang - Petir RT.012 / RW.001 Ds. Cimaung, Kec.
              Cikeusal, Kab. Serang - Banten
            </li>
            <li className="flex items-center gap-3 text-sm sm:text-base">
              <Img src={call} alt="icon call" className="min-w-10 aspect-square" /> 0254 - 7932385
            </li>
            <li className="flex items-center gap-3 text-sm sm:text-base">
              <Img src={email} alt="icon email" className="min-w-10 aspect-square" /> tbm.srg@gmail.com
            </li>
          </menu>
          <a href="https://wa.me/6281288385837" rel="noreferrer" target="_blank" className="block">
            <Button className="flex items-center justify-center w-full gap-2 btn-primary">
              <FaWhatsapp className="size-4 sm:size-5 md:size-6" /> {t("left-side.button-text")}
            </Button>
          </a>
        </Motion>
        <Motion
          tag="div"
          initialX={40}
          animateX={0}
          duration={0.6}
          delay={0.3}
          className="flex-1 px-4 py-4 space-y-4 card-shadow md:px-8 rounded-2xl bg-light"
        >
          <div className="space-y-2">
            <h4 className="text-xl font-semibold sm:text-2xl lg:text-3xl text-primary">{t("right-side.title")}</h4>
            <p className="text-sm">{t("right-side.description")}</p>
          </div>
          <Form buttonTitle={`${t("right-side.button-text")}`} />
        </Motion>
      </div>
    </Container>
  );
};
