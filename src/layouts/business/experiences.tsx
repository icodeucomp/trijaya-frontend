import Image from "next/image";

import { useTranslations } from "next-intl";

import { Container } from "@/components";

import { clientsTableLists } from "@/static";

export const Experiences = () => {
  const t = useTranslations("business.experiences");
  return (
    <Container id="experience" className="pb-20">
      <div className="max-w-xl mx-auto space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="text-sm font-medium sm:text-base md:text-lg text-dark-gray">{t("description")}</p>
      </div>
      <div className="grid grid-cols-1 gap-8 px-0 mt-8 md:grid-cols-2 sm:px-4 md:px-8">
        {clientsTableLists.map((item, index) => (
          <div key={index} className="overflow-hidden">
            <h6 className="py-3 text-center rounded-t-lg bg-primary text-light">{item.year}</h6>
            {item.clients.map((item, index, row) => {
              const smallTitleSize = ["PT JUMANTA MITRA UTAMA", "PT Suri Tani Pemuka", "PT Arwana Citra Mulia Tbk", "PT Japfa Comfeed Indonesia Tbk"];
              const sizes = smallTitleSize.includes(item.title) ? 100 : 140;
              const lastIndex = row.length === index + 1;
              return (
                <div key={index} className={`grid grid-cols-3 border-b text-dark-gray ${lastIndex && "rounded-b-lg"}`}>
                  <div className={`flex items-center justify-center h-16 border-l border-r ${lastIndex && "rounded-es-lg"}`}>
                    <Image src={item.pathImg} alt={item.title} width={sizes} height={sizes} className="max-w-24 lg:max-w-40" />
                  </div>
                  <div
                    className={`flex text-xs sm:text-sm md:text-base items-center col-span-2 pl-4 font-medium border-r ${
                      lastIndex && "rounded-ee-lg"
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Container>
  );
};
