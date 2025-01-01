import type { Metadata } from "next";
import { Epilogue, Cairo } from "next/font/google";
import Favicon from "/public/favicon.ico";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getDictionary } from "@/dictionaries";
import "../globals.css";

const locales = ["en", "ar"];

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
    lang: string;
  }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!locales.includes(lang)) {
    notFound();
  }

  const t = await getDictionary(lang);

  return (
    <html
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
      className={`h-full ${epilogue.variable} ${cairo.variable}`}
    >
      <body
        className={`flex min-h-screen flex-col ${
          lang === "ar"
            ? "font-cairo text-right leading-loose"
            : "font-epilogue text-left leading-normal"
        }`}
      >
        <Header lang={lang} t={t} />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
