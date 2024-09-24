import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

import { OrganizationalLists } from "@/static";

export const OrganizationalStructure = () => {
  const t = useTranslations("profile.organizational-structure");

  const organizational = OrganizationalLists();
  return (
    <Container className="py-16 space-y-8">
      <div className="space-y-2">
        <h3 className="text-primary text-4xl font-semibold">{t("title")}</h3>
        <p className="text-dark-gray text-xl">{t("description")}</p>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {organizational.map((item, index) => (
          <div key={index} className="text-dark-gray space-y-1">
            <Img src={item.pathImg} alt={item.name} className="h-72 w-full" cover />
            <h5 className="text-lg font-semibold w-max">{item.name}</h5>
            <p className="text-sm w-max">{item.job}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
