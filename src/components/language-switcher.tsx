"use client";

import { MouseEvent, useTransition } from "react";

import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/routing";

import { Img } from "./image";

import { languages } from "@/static";

type localeType = "id" | "en" | "cn";

export const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const handleChangeLanguage = (e: MouseEvent<HTMLButtonElement>, locale: localeType) => {
    e.preventDefault();
    startTransition(() => {
      router.push(pathname, { locale });
    });
  };

  return (
    <div className="flex gap-2 divide-x xl:gap-4 divide-primary">
      {languages.map((item, index) => {
        return (
          <button
            key={index}
            disabled={isPending}
            onClick={(e) => handleChangeLanguage(e, item.title)}
            className={`flex items-center gap-1 pl-2 text-sm xl:pl-4 uppercase ${
              localActive === item.title ? "text-secondary font-semibold" : "text-light font-medium"
            }`}
          >
            <Img className="size-3 md:size-5" src={item.pathIcon} alt="United Kingdom Flag" />
            {item.title}
          </button>
        );
      })}
    </div>
  );
};
