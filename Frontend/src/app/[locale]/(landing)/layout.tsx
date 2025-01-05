import { Epilogue, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../../globals.css";
import { LOCALES } from "@/lib/i18n/config";

type Locale = "en" | "ar";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-epilogue"
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-cairo"
});

export default async function LandingLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!LOCALES.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = (await import(`@/lib/i18n/messages/${locale}.json`)).default;

  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      className={`h-full ${epilogue.variable} ${cairo.variable}`}
    >
      <body
        className={`min-h-screen ${
          locale === "ar" ? "font-cairo text-right" : "font-epilogue text-left"
        }`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
