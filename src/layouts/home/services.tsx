import { useTranslations } from "next-intl";

import { Container, Img, Motion } from "@/components";

import { ServiceLists } from "@/static";
import { Link } from "@/i18n/routing";

import { PiCaretRightBold } from "react-icons/pi";

export const Services = () => {
  const t = useTranslations();

  const services = ServiceLists();

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <Motion tag="div" initialY={-50} animateY={0} duration={0.3} className="space-y-2 text-center">
        <h3 className="heading">{t("home.services.title")}</h3>
        <p className="subheading">{t("home.services.description")}</p>
      </Motion>
      <div className="flex flex-wrap gap-8 justify-center">
        {services.map((item, index) => (
          <Motion
            tag="div"
            initialY={50}
            animateY={0}
            duration={1}
            delay={index * 0.3}
            key={index}
            className="flex-1 min-w-80 max-w-sm relative px-4 space-y-4 duration-300 rounded-lg shadow-lg sm:px-8 pb-4 sm:pb-8 bg-light hover:bg-primary group"
          >
            <div className="px-4 py-2 rounded-b-lg bg-light-gray w-max">
              <Img src={item.pathImg} alt={item.title} className="size-10 sm:size-12" />
            </div>
            <h5 className="font-semibold text-primary group-hover:text-light">{item.title}</h5>
            <p className="text-sm group-hover:text-light">{item.description}</p>
            <span className="absolute top-4 right-4 text-light">
              <Link href={`/business/sector/${item.slug}`} className="flex items-center text-sm">
                {t("see-details")}
                <PiCaretRightBold size={20} />
              </Link>
            </span>
          </Motion>
        ))}
      </div>
    </Container>
  );
};
