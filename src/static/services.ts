import { useTranslations } from "next-intl";

import { auto_repair, data_usage_settings, electric_cord, engineering, factory_worker, miner_worker, park_delivery, pipe } from "@/icons";

import { TemplateTypes } from "@/types";

interface FooterTypes extends TemplateTypes {
  slug: string;
}

export const ServiceLists = () => {
  const t = useTranslations("home.services");

  return [
    {
      pathImg: park_delivery,
      title: `${t("one.title")}`,
      description: `${t("one.description")}`,
      slug: "general-supplier",
    },
    {
      pathImg: factory_worker,
      title: `${t("two.title")}`,
      description: `${t("two.description")}`,
      slug: "civil-construction",
    },
    {
      pathImg: data_usage_settings,
      title: `${t("three.title")}`,
      description: `${t("three.description")}`,
      slug: "fabrication",
    },
    {
      pathImg: auto_repair,
      title: `${t("four.title")}`,
      description: `${t("four.description")}`,
      slug: "mechanical",
    },
    {
      pathImg: engineering,
      title: `${t("five.title")}`,
      description: `${t("five.description")}`,
      slug: "engineering",
    },
    {
      pathImg: electric_cord,
      title: `${t("six.title")}`,
      description: `${t("six.description")}`,
      slug: "electrical",
    },
    {
      pathImg: miner_worker,
      title: `${t("seven.title")}`,
      description: `${t("seven.description")}`,
      slug: "manpower-supply",
    },
    {
      pathImg: pipe,
      title: `${t("eight.title")}`,
      description: `${t("eight.description")}`,
      slug: "Piping",
    },
  ] as FooterTypes[];
};
