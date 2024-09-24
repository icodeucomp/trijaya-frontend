import { useTranslations } from "next-intl";

import { new_job, permanent_job } from "@/icons";

import { TemplateTypes } from "@/types";

interface CareerTypes extends TemplateTypes {
  buttonText: string;
}

export const CareerLists = () => {
  const t = useTranslations("career");

  return [
    {
      pathImg: permanent_job,
      title: `${t("one.title")}`,
      description: `${t("one.description")}`,
      buttonText: `${t("one.button-text")}`,
    },
    {
      pathImg: new_job,
      title: `${t("two.title")}`,
      description: `${t("two.description")}`,
      buttonText: `${t("two.button-text")}`,
    },
  ] as CareerTypes[];
};
