import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (locale) {
    return {
      locale,
      messages: (await import(`@/lib/i18n/messages/${locale}.json`)).default
    };
  }
});
