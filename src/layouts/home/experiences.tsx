import Image from "next/image";

import { useTranslations } from "next-intl";

import { Container, Motion } from "@/components";

import { clientsTableLists } from "@/static";
import { shimmer, toBase64 } from "@/utils";

export const Experiences = () => {
  const t = useTranslations("home.experiences");
  return (
    <Container id="experience" className="py-16">
      <Motion tag="div" initialY={-40} animateY={0} duration={1} className="max-w-xl mx-auto space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="text-sm font-medium sm:text-base md:text-lg text-dark-gray">{t("description")}</p>
      </Motion>
      <div className="grid grid-cols-1 gap-8 px-0 mt-8 md:grid-cols-2 sm:px-4 md:px-8">
        {clientsTableLists.map((item, index) => (
          <Motion tag="div" initialY={40} animateY={0} duration={1} delay={index * 0.1} key={index} className="overflow-hidden">
            <h6 className="py-3 text-center rounded-t-lg bg-primary text-light">{item.year}</h6>
            {item.clients.map((item, index, row) => {
              const smallTitleSize = ["PT JUMANTA MITRA UTAMA", "PT Suri Tani Pemuka", "PT Arwana Citra Mulia Tbk", "PT Japfa Comfeed Indonesia Tbk"];
              const sizes = smallTitleSize.includes(item.title) ? 100 : 140;
              const lastIndex = row.length === index + 1;
              return (
                <div key={index} className={`grid grid-cols-3 border-b text-dark-gray ${lastIndex && "rounded-b-lg"}`}>
                  <div className={`flex items-center justify-center h-16 border-l border-r ${lastIndex && "rounded-es-lg"}`}>
                    <Image
                      src={item.pathImg}
                      alt={item.title}
                      width={sizes}
                      height={sizes}
                      className="max-w-24 lg:max-w-40 max-h-14"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(sizes, 56))}`}
                    />
                  </div>
                  <div className={`flex text-xs sm:text-sm md:text-base items-center col-span-2 pl-4 font-medium border-r ${lastIndex && "rounded-ee-lg"}`}>{item.title}</div>
                </div>
              );
            })}
          </Motion>
        ))}
      </div>
    </Container>
  );
};
