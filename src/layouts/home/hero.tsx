import { useTranslations } from "next-intl";

import { Background, Button, Img } from "@/components";

import { arrow_up_light } from "@/icons";

export const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <Background src="/images/home-header.webp" className="min-h-500 flex items-center filter">
      <div className="space-y-4 max-w-xl">
        <h1 className="text-5xl font-semibold leading-snug">{t("title")}</h1>
        <p className="text-lg">{t("description")}</p>
        <div className="flex gap-4">
          <Button className="border border-light hover:bg-light hover:text-primary">{t("button-learn-more")}</Button>
          <Button className="bg-primary flex items-center hover:bg-primary/90">
            {t("button-our-business")}
            <Img src={arrow_up_light} alt="arrow-up-light" className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </Background>
  );
};
