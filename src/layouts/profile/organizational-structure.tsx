import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

import { OrganizationalLists } from "@/static";

export const OrganizationalStructure = () => {
  const t = useTranslations("profile.organizational-structure");

  const organizational = OrganizationalLists();
  return (
    <Container id="organizational" className="py-16 space-y-8">
      <div className="space-y-4 text-center sm:space-y-2 sm:text-start">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {organizational.map((item, index) => (
          <div key={index} className={`relative overflow-hidden ${index === 0 ? "xl:row-span-2" : "row-span-1"}`}>
            <Img
              src={item.pathImg}
              alt={item.name}
              className={`w-full overflow-hidden rounded-lg ${index === 0 ? "h-full" : "h-60 sm:h-72"}`}
              cover
            />
            <div className="absolute inset-0 flex flex-col justify-end p-2 rounded-lg text-light filter-image">
              <h5 className="text-sm font-semibold sm:text-base md:text-lg w-max">{item.name}</h5>
              <p className="text-xs sm:text-sm w-max">{item.job}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
