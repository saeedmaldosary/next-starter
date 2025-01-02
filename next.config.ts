import createNextIntlPlugin from "next-intl/plugin";
import { DEFAULT_LOCALE } from "@/app/config/locale";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  output: "standalone" as const,
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${DEFAULT_LOCALE}`,
        permanent: true
      }
    ];
  }
};

export default withNextIntl(nextConfig);
