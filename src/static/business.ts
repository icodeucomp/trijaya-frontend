import { useTranslations } from "next-intl";

import { building, electric_cord, electrical_services, helmet_safety, miner_worker, navaid_military, robot_two, scheduled_maintenance } from "@/icons";

import { TemplateTypes } from "@/types";

export const Business = () => {
  const t = useTranslations("home.details");

  return [
    {
      title: `${t("list-one.title")}`,
      description: `${t("list-one.description")}`,
      pathImg: electric_cord,
    },
    {
      title: `${t("list-two.title")}`,
      description: `${t("list-two.description")}`,
      pathImg: electrical_services,
    },
    {
      title: `${t("list-three.title")}`,
      description: `${t("list-three.description")}`,
      pathImg: robot_two,
    },
    {
      title: `${t("list-four.title")}`,
      description: `${t("list-four.description")}`,
      pathImg: navaid_military,
    },
    {
      title: `${t("list-five.title")}`,
      description: `${t("list-five.description")}`,
      pathImg: building,
    },
    {
      title: `${t("list-six.title")}`,
      description: `${t("list-six.description")}`,
      pathImg: helmet_safety,
    },
    {
      title: `${t("list-seven.title")}`,
      description: `${t("list-seven.description")}`,
      pathImg: miner_worker,
    },
    {
      title: `${t("list-eight.title")}`,
      description: `${t("list-eight.description")}`,
      pathImg: scheduled_maintenance,
    },
  ] as TemplateTypes[];
};
