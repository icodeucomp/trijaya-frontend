import { FooterTypes } from "@/types";
import { useTranslations } from "next-intl";

export const FooterLists = () => {
  const t = useTranslations("footer");

  return [
    {
      title: `${t("profile.title")}`,
      fields: [
        `${t("profile.fields.one")}`,
        `${t("profile.fields.two")}`,
        `${t("profile.fields.three")}`,
        `${t("profile.fields.four")}`,
        `${t("profile.fields.five")}`,
      ],
    },
    {
      title: `${t("business.title")}`,
      fields: [`${t("business.fields.one")}`, `${t("business.fields.two")}`, `${t("business.fields.three")}`, `${t("business.fields.four")}`],
    },
    { title: `${t("media.title")}`, fields: [`${t("media.fields.one")}`, `${t("media.fields.two")}`] },
    { title: `${t("contact-us.title")}`, fields: [`${t("contact-us.fields.one")}`, `${t("contact-us.fields.two")}`] },
    { title: `${t("career.title")}`, fields: [`${t("career.fields.one")}`, `${t("career.fields.two")}`] },
  ] as FooterTypes[];
};
