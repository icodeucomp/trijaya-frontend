import { useTranslations } from "next-intl";

import { FooterTypes } from "@/types";

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
        { title: "Electrical", pathUrl: "/sector/electrical" },
        { title: "Fabrication", pathUrl: "/sector/fabrication" },
        { title: "General Supplier", pathUrl: "/sector/general-supplier" },
        { title: "Machining", pathUrl: "/sector/machining" },
        { title: "Mechanical", pathUrl: "/sector/mechanical" },
        { title: "Civil & Construction", pathUrl: "/sector/civil-construction" },
      ],
    },
    {
      title: `${t("media.title")}`,
      pathUrl: "/media",
      content: [
        { title: `${t("media.fields.one")}`, pathUrl: "#projects-gallery" },
        { title: `${t("media.fields.two")}`, pathUrl: "#lifeattbm" },
        { title: `${t("media.fields.three")}`, pathUrl: "#articles-gallery" },
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
