import { Background, Container } from "@/components";
import { Link } from "@/i18n/routing";

import { sectorBusinessLists } from "@/static";
import { useTranslations } from "next-intl";

export const YourBusiness = () => {
  const t = useTranslations("business.your-business");

  return (
    <Container className="py-20 space-y-8">
      <div className="space-y-2 text-center">
        <h3 className="text-4xl font-semibold text-primary">{t("title")}</h3>
        <p className="text-lg text-dark-gray">{t("description")}</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
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
