import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { LOCALES, LOCALE_PREFIX } from "@/lib/i18n/config";

export const { Link, useRouter, usePathname } = createSharedPathnamesNavigation(
  {
    locales: LOCALES,
    localePrefix: LOCALE_PREFIX
  }
);
