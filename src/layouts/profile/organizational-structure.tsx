import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

import { OrganizationalLists } from "@/static";

export const OrganizationalStructure = () => {
  const t = useTranslations("profile.organizational-structure");

  const organizational = OrganizationalLists();
  return (
    <Container className="py-16 space-y-8">
      <div className="space-y-4 text-center sm:space-y-2 sm:text-start">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {organizational.map((item, index) => (
          <div key={index} className="space-y-1 text-dark-gray">
            <Img src={item.pathImg} alt={item.name} className="w-full h-60 sm:h-72" cover />
            <h5 className="text-sm font-semibold sm:text-base md:text-lg w-max">{item.name}</h5>
            <p className="text-xs sm:text-sm w-max">{item.job}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
