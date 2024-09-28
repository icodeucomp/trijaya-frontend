import { useTranslations } from "next-intl";

import { Background, Button, Img } from "@/components";

import { arrow_up_light } from "@/icons";
import { Link } from "@/i18n/routing";

export const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <Background src="/images/home-header.webp" className="flex items-center min-h-500 lg:min-h-custom-header 2xl:min-h-500" parentClassName="filter">
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl font-semibold leading-snug md:text-4xl">{t("title")}</h1>
        <p className="text-base sm:text-lg">{t("description")}</p>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="block h-full">
            <Button className="h-full border border-light hover:bg-light hover:text-primary">{t("button-learn-more")}</Button>
          </Link>
          <Link href="/business" className="block h-full">
            <Button className="flex items-center btn-primary">
              {t("button-our-business")}
              <Img src={arrow_up_light} alt="arrow-up-light" className="size-5 sm:size-6 lg:size-7 xl:size-8" />
            </Button>
          </Link>
        </div>
      </div>
    </Background>
  );
};
