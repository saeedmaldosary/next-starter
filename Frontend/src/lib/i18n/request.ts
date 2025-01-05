import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || DEFAULT_LOCALE;
  return {
    locale,
    messages: (await import(`@/lib/i18n/messages/${locale}.json`)).default
  };
});
