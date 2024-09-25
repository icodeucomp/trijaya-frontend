import Image from "next/image";

import { useTranslations } from "next-intl";

import { Container } from "@/components";

import { clientsImage } from "@/static";

export const Clients = () => {
  const t = useTranslations("home.clients");

  return (
    <Container className="py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h3 className="text-4xl font-semibold text-primary">{t("title")}</h3>
        <p className="text-xl text-dark-gray">{t("description")}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-x-8 sm:gap-x-12 gap-y-8">
        {clientsImage.map((item, index) => {
          const sizes = index > 10 ? 100 : 160;
          return (
            <div key={index} className="grid w-full h-24 px-2 border rounded-lg border-primary bg-light place-items-center">
              <Image src={item} alt="image clients PT Trijata Berkah Mandiri" width={sizes} height={sizes} className="max-w-32 sm:max-w-40" />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
