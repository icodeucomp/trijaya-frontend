import { useTranslations } from "next-intl";

import { Background, Button, Img, Motion } from "@/components";

import { arrow_up_light } from "@/icons";
import { Link } from "@/i18n/routing";

export const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <Background
      src="/images/home-header.webp"
      className="items-center max-w-screen-xl px-4 sm:px-8 min-h-500 lg:min-h-custom-header"
      parentClassName="filter"
    >
      <div className="max-w-xl space-y-4">
        <Motion tag="h1" initialX={-50} animateX={0} duration={0.3} className="text-3xl font-semibold leading-snug md:text-4xl">
          {t("title")}
        </Motion>
        <Motion tag="h1" initialX={-50} animateX={0} duration={0.5} delay={0.3} className="text-base sm:text-lg">
          {t("description")}
        </Motion>
        <Motion tag="h1" initialX={-50} animateX={0} duration={0.8} delay={0.5} className="flex items-center gap-4">
          <Link href="/profile" className="block h-full">
            <Button className="h-full border border-light hover:bg-light hover:text-primary">{t("button-learn-more")}</Button>
          </Link>
          <Link href="/business" className="block h-full">
            <Button className="flex items-center btn-primary">
              {t("button-our-business")}
              <Img src={arrow_up_light} alt="arrow-up-light" className="size-5 sm:size-6 lg:size-7 xl:size-8" />
            </Button>
          </Link>
        </Motion>
      </div>
    </Background>
  );
};
