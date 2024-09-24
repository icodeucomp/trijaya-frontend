import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

import { ServiceLists } from "@/static";

export const OurServices = () => {
  const t = useTranslations("home.services");

  const services = ServiceLists();

  return (
    <Container className="py-24 space-y-8">
      <div className="space-y-2 text-center">
        <h3 className="text-4xl font-semibold text-primary">{t("title")}</h3>
        <p className="text-xl text-dark-gray">{t("description")}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <div key={index} className="flex-1 p-8 space-y-2 rounded-lg shadow-lg bg-light">
            <div className="px-4 py-2 rounded-lg bg-light-gray w-max">
              <Img src={item.pathImg} alt={item.title} className="size-12" />
            </div>
            <h5 className="font-semibold text-primary">{item.title}</h5>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
