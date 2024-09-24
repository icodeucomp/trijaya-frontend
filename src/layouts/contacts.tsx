import { Button, Container, Form, Img } from "@/components";

import { call, email, location } from "@/icons";
import { useTranslations } from "next-intl";

import { FaWhatsapp } from "react-icons/fa6";

export const Contacts = () => {
  const t = useTranslations("contact-us");

  return (
    <Container className="py-20 space-y-12">
      <div className="space-y-2 text-center">
        <h3 className="text-3xl font-semibold md:text-4xl text-primary">{t("head.title")}</h3>
        <p className="text-dark-gray text-xl">{t("head.description")}</p>
      </div>
      <div className="flex flex-col justify-between gap-0 md:gap-20 md:flex-row">
        <div className="flex-1 space-y-8">
          <h3 className="text-2xl font-semibold md:text-3xl text-primary">{t("left-side.title")}</h3>
          <menu className="space-y-2">
            <li className="flex items-center gap-2">
              <Img src={location} alt="icon location" className="aspect-square w-10" /> Jl.Bhayangkara No.136B, Kota Serang-Banten 42118
            </li>
            <li className="flex items-center gap-2">
              <Img src={call} alt="icon call" className="aspect-square w-10" /> 0254 - 7932385
            </li>
            <li className="flex items-center gap-2">
              <Img src={email} alt="icon email" className="aspect-square w-10" /> tbm.srg@gmail.com
            </li>
          </menu>
          <a href="https://wa.me/6281334105663" rel="noreferrer" target="_blank" className="block">
            <Button className="flex items-center justify-center btn-primary gap-2 w-full">
              <FaWhatsapp size={25} /> {t("left-side.button-text")}
            </Button>
          </a>
        </div>
        <div className="px-4 shadow-lg md:px-8 py-4 rounded-2xl bg-light space-y-4 flex-1">
          <div className="space-y-2">
            <h4 className="text-primary text-3xl font-semibold">{t("right-side.title")}</h4>
            <p className="text-sm">{t("right-side.description")}</p>
          </div>
          <Form buttonTitle={`${t("right-side.button-text")}`} />
        </div>
      </div>
    </Container>
  );
};
