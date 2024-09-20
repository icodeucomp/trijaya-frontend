import { Container } from "@/components";
import { clientsTableLists } from "@/static";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Experiences = () => {
  const t = useTranslations("business.experiences");
  return (
    <Container className="pb-20">
      <div className="max-w-xl mx-auto space-y-2 text-center">
        <h3 className="text-4xl font-semibold text-primary">{t("title")}</h3>
        <p className="text-lg font-medium text-dark-gray">{t("description")}</p>
      </div>
      <div className="grid grid-cols-2 gap-8 px-0 mt-8 sm:px-4 md:px-8">
        {clientsTableLists.map((item, index) => (
          <div key={index} className="overflow-hidden">
            <h6 className="py-3 text-center rounded-t-lg bg-primary text-light">{item.year}</h6>
            {item.clients.map((client, index, row) => {
              const smallTitleSize = ["PT JUMANTA MITRA UTAMA", "PT Suri Tani Pemuka", "PT Arwana Citra Mulia Tbk"];
              const sizes = smallTitleSize.includes(client.title) ? 100 : 140;
              const lastIndex = row.length === index + 1;
              return (
                <div key={index} className={`grid grid-cols-3 border-b text-dark-gray ${lastIndex && "rounded-b-lg"}`}>
                  <div className={`flex items-center justify-center h-16 border-l border-r ${lastIndex && "rounded-es-lg"}`}>
                    <Image src={client.pathImg} alt={client.title} width={sizes} height={sizes} className="max-w-40" />
                  </div>
                  <div className={`flex items-center col-span-2 pl-4 font-medium border-r ${lastIndex && "rounded-ee-lg"}`}>{client.title}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Container>
  );
};
