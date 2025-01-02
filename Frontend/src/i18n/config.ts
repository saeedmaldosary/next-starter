export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const LOCALE_PREFIX = "always" as const;

export const DEFAULT_LOCALE: Locale = "en";

// Validate default locale is in available locales
if (!LOCALES.includes(DEFAULT_LOCALE)) {
  throw new Error(
    `Default locale "${DEFAULT_LOCALE}" must be included in locales: ${LOCALES.join(
      ", "
    )}`
  );
}
