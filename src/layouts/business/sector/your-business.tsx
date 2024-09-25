import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import { Background, Container } from "@/components";

import { sectorBusinessLists } from "@/static";

export const YourBusiness = () => {
  const t = useTranslations("business.your-business");

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <div className="space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-4">
        {sectorBusinessLists.map((item, index) => (
          <Link href={`/business/sector${item.pathUrl}`} key={index}>
            <Background src={item.pathImg} className="items-center justify-center py-8 aspect-square filter-image" parentClassName="rounded-lg">
              <h5 className="text-xl font-semibold">{item.name}</h5>
            </Background>
          </Link>
        ))}
      </div>
    </Container>
  );
};
