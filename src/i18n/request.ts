import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    locale, // Add this line
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
