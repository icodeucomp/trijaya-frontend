import { FooterTypes } from "@/types";
import { useTranslations } from "next-intl";

export const FooterLists = () => {
  const t = useTranslations("footer");

  return [
    {
      title: `${t("profile.title")}`,
      pathUrl: "/profile",
      content: [
        { title: `${t("profile.fields.one")}`, pathUrl: "#about-us" },
        { title: `${t("profile.fields.two")}`, pathUrl: "#vision-mission" },
        { title: `${t("profile.fields.three")}`, pathUrl: "#organizational" },
        { title: `${t("profile.fields.four")}`, pathUrl: "/certification" },
      ],
    },
    {
      title: `${t("business.title")}`,
      pathUrl: "/business",
      content: [
        { title: `${t("business.fields.one")}`, pathUrl: "#service" },
        { title: `${t("business.fields.two")}`, pathUrl: "#product" },
        { title: `${t("business.fields.three")}`, pathUrl: "#experience" },
        { title: `${t("business.fields.four")}`, pathUrl: "/sector" },
      ],
    },
    {
      title: `${t("media.title")}`,
      pathUrl: "/media",
      content: [
        { title: `${t("media.fields.one")}`, pathUrl: "#article" },
        { title: `${t("media.fields.two")}`, pathUrl: "#company-activity" },
      ],
    },
    {
      title: `${t("contact-us.title")}`,
      pathUrl: "/contact-us",
      content: [
        { title: `${t("contact-us.fields.one")}`, pathUrl: "#contact" },
        { title: `${t("contact-us.fields.two")}`, pathUrl: "#contact" },
      ],
    },
    {
      title: `${t("career.title")}`,
      pathUrl: "/career",
      content: [
        { title: `${t("career.fields.one")}`, pathUrl: "#career" },
        { title: `${t("career.fields.two")}`, pathUrl: "#career" },
      ],
    },
  ] as FooterTypes[];
};
