import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type localeType = "id" | "en" | "cn";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as localeType)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
