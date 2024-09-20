import { Background, Img } from "@/components";
import { ServiceAndProductLists } from "@/static/services-products";
import { useTranslations } from "next-intl";

export const Details = () => {
  const t = useTranslations("business.details");

  const lists = ServiceAndProductLists();

  return (
    <div className="grid grid-cols-2 max-w-screen-2xl mx-auto w-full">
      <Background src="/temp-image-2.png" className="flex-col justify-between w-full h-full py-40 filter">
        <div className="px-16 text-light">
          <h3 className="text-5xl font-semibold">{t("title")}</h3>
          <p className="mt-2 text-lg leading-normal text-justify">{t("description")}</p>
          <div className="flex items-center gap-2 mt-8 text-sm">
            <h5 className="text-xl font-medium">Motto</h5>
            <i className="w-20 border-t border-gray-400" />
          </div>
          <h4 className="mt-2 text-2xl font-semibold">Good Services & On Time Delivery</h4>
        </div>
        <div className="flex items-center gap-4 px-16 text-justify text-light">
          <i className="h-32 border-l-2 border-secondary" />
          <p className="text-lg leading-normal">{t("message")}</p>
        </div>
      </Background>
      <div className="w-full p-8 space-y-8 bg-light-gray">
        {lists.map((list, index) => (
          <div key={index} className="flex items-center gap-4 px-8 py-4 rounded-lg bg-primary">
            <div className="p-4 rounded-lg bg-light">
              <Img src={list.pathImg} alt={list.title} className="w-12 aspect-square" />
            </div>
            <div className="space-y-1 text-light">
              <h5 className="text-lg font-semibold">{list.title}</h5>
              <p className="text-sm leading-snug">{list.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
