import type { Metadata } from "next";
import { Epilogue, Cairo } from "next/font/google";
import Favicon from "/public/favicon.ico";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Providers } from "@/app/providers";
import "../globals.css";
import { LOCALES, Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Next Starter",
  description:
    "Next.js starter template with TypeScript, shadcn/ui and authentication",
  icons: [{ rel: "icon", url: Favicon.src }]
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

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

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
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
