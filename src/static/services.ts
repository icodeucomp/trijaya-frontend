import { useTranslations } from "next-intl";

import { auto_repair, data_usage_settings, electric_cord, factory_worker, miner_worker, park_delivery, pipe } from "@/icons";

import { TemplateTypes } from "@/types";

interface FooterTypes extends TemplateTypes {
  slug: string;
}

export const ServiceLists = () => {
  const t = useTranslations("home.services");

  return [
    {
      pathImg: auto_repair,
      title: `${t("one.title")}`,
      description: `${t("one.description")}`,
      slug: "mechanical",
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
      pathImg: pipe,
      title: `${t("four.title")}`,
      description: `${t("four.description")}`,
      slug: "piping",
    },
    {
      pathImg: miner_worker,
      title: `${t("six.title")}`,
      description: `${t("six.description")}`,
      slug: "manpower-supply",
    },
    {
      pathImg: park_delivery,
      title: `${t("seven.title")}`,
      description: `${t("seven.description")}`,
      slug: "general-supplier",
    },
    {
      pathImg: electric_cord,
      title: `${t("eight.title")}`,
      description: `${t("eight.description")}`,
      slug: "electrical",
    },
  ] as FooterTypes[];
};
