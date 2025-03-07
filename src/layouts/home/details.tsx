import { useTranslations } from "next-intl";

import { Background, Img, Motion } from "@/components";

import { Business } from "@/static/business";

export const Details = () => {
  const t = useTranslations("home.details");

  const businessLists = Business();

  return (
    <div className="grid w-full grid-cols-1 mx-auto lg:grid-cols-2 max-w-screen-2xl">
      <Background src="/images/business-details.webp" className="flex-col w-full h-full gap-40 py-20 lg:gap-0 lg:justify-between sm:py-28 md:py-32 filter-image">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} className="px-2 sm:px-6 md:px-10 xl:px-14 text-light">
          <h3 className="text-xl font-semibold sm:text-2xl lg:text-3xl xl:text-5xl">{t("title")}</h3>
          <p className="mt-2 text-sm leading-normal text-justify sm:text-base md:text-lg">{t("description")}</p>
          <div className="flex items-center gap-2 mt-4 text-sm sm:mt-8">
            <h5 className="text-lg font-medium sm:text-xl">{t("motto-name")}</h5>
            <i className="w-20 border-t border-gray-400" />
          </div>
          <h4 className="mt-2 text-lg font-semibold sm:text-xl">{t("motto")}</h4>
        </Motion>
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} delay={0.6} className="flex items-center gap-4 px-2 text-justify sm:px-6 md:px-12 lg:px-14 text-light">
          <i className="h-32 border-l-2 border-secondary" />
          <p className="text-sm leading-normal sm:text-base md:text-lg">{t("message")}</p>
        </Motion>
      </Background>
      <div className="w-full px-4 py-8 space-y-4 sm:p-8 sm:space-y-8 bg-light-gray">
        {businessLists.map((item, index) => (
          <Motion tag="div" initialX={40} animateX={0} duration={1} delay={index * 0.1} key={index} className="flex items-center gap-4 px-4 py-4 rounded-lg sm:px-8 bg-primary">
            <div className="p-4 rounded-lg bg-light">
              <Img src={item.pathImg} alt={item.title} className="w-10 sm:w-12 aspect-square" />
            </div>
            <div className="space-y-1 text-light">
              <h5 className="text-sm font-semibold sm:text-base md:text-lg">{item.title}</h5>
              <p className="leading-snug text-xxs sm:text-xs md:text-sm">{item.description}</p>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};
