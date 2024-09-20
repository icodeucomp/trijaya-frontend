import { useTranslations } from "next-intl";

import { building, electric_cord, electrical_services, helmet_safety, navaid_military, quill_paper, robot_two } from "@/icons";

import { TemplateTypes } from "@/types";

export const ServiceAndProductLists = () => {
  const t = useTranslations("business.details");

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
      pathImg: quill_paper,
    },
  ] as TemplateTypes[];
};
