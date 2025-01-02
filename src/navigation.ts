import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { LOCALES, LOCALE_PREFIX } from "@/app/config/locale";

export const { Link, useRouter, usePathname } = createSharedPathnamesNavigation(
  {
    locales: LOCALES,
    localePrefix: LOCALE_PREFIX
  }
);
