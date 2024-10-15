import { useTranslations } from "next-intl";

import { Container, Img, Motion } from "@/components";

import { ServiceLists } from "@/static";

export const OurServices = () => {
  const t = useTranslations("home.services");

  const services = ServiceLists();

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <Motion tag="div" initialY={-50} animateY={0} duration={0.3} className="space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </Motion>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <Motion
            tag="div"
            initialY={50}
            animateY={0}
            duration={1}
            delay={index * 0.3}
            key={index}
            className="flex-1 p-6 space-y-2 rounded-lg shadow-lg sm:p-8 bg-light"
          >
            <div className="px-4 py-2 rounded-lg bg-light-gray w-max">
              <Img src={item.pathImg} alt={item.title} className="size-10 sm:size-12" />
            </div>
            <h5 className="font-semibold text-primary">{item.title}</h5>
            <p className="text-sm">{item.description}</p>
          </Motion>
        ))}
      </div>
    </Container>
  );
};
