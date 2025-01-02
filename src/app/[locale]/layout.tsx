import type { Metadata } from "next";
import { Epilogue, Cairo } from "next/font/google";
import Favicon from "/public/favicon.ico";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import "../globals.css";
import { LOCALES } from "@/app/config/locale";

const locales = LOCALES;

export const metadata: Metadata = {
  title: "Next Starter",
  description: "Next.js starter template with TypeScript and shadcn/ui",
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

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout({ children, params }: Props) {
  // Await the params object
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Set the locale for next-intl
  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      className={`h-full ${epilogue.variable} ${cairo.variable}`}
    >
      <body
        className={`flex min-h-screen flex-col ${
          locale === "ar"
            ? "font-cairo text-right leading-loose"
            : "font-epilogue text-left leading-normal"
        }`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
