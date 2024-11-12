import { useTranslations } from "next-intl";

import { building, electric_cord, electrical_services, helmet_safety, robot_two, scheduled_maintenance } from "@/icons";

import { TemplateTypes } from "@/types";

export const Business = () => {
  const t = useTranslations("home.details");

  return [
    {
      title: `${t("list-one.title")}`,
      description: `${t("list-one.description")}`,
      pathImg: building,
    },
    {
      title: `${t("list-two.title")}`,
      description: `${t("list-two.description")}`,
      pathImg: robot_two,
    },
    {
      title: `${t("list-three.title")}`,
      description: `${t("list-three.description")}`,
      pathImg: scheduled_maintenance,
    },
    {
      title: `${t("list-four.title")}`,
      description: `${t("list-four.description")}`,
      pathImg: helmet_safety,
    },
    {
      title: `${t("list-five.title")}`,
      description: `${t("list-five.description")}`,
      pathImg: electric_cord,
    },
    {
      title: `${t("list-six.title")}`,
      description: `${t("list-six.description")}`,
      pathImg: electrical_services,
    },
  ] as TemplateTypes[];
};
