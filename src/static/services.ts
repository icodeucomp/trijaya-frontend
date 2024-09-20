import { TemplateTypes } from "@/types";
import { data_usage_settings, factory_worker, park_delivery } from "@/icons";
import { useTranslations } from "next-intl";

export const ServiceLists = () => {
  const t = useTranslations("home.services");
  return [
    {
      pathImg: park_delivery,
      title: `${t("one.title")}`,
      description: `${t("one.description")}`,
    },
    {
      pathImg: factory_worker,
      title: `${t("two.title")}`,
      description: `${t("two.description")}`,
    },
    {
      pathImg: data_usage_settings,
      title: `${t("three.title")}`,
      description: `${t("three.description")}`,
    },
  ] as TemplateTypes[];
};
