import { useTranslations } from "next-intl";

import { Background, Button, Motion } from "@/components";

import { Link } from "@/i18n/routing";

export const Hero = () => {
  const t = useTranslations("home.hero");

  return (
    <Background src="/images/home-header.webp" className="justify-center min-h-500 bg-black/40 lg:min-h-custom-header-home">
      <div className="flex items-center w-full max-w-screen-xl px-4 sm:px-8">
        <div className="max-w-2xl space-y-4">
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
          </Motion>
        </div>
      </div>
    </Background>
  );
};
