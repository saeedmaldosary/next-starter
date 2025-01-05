import { Locale } from "@/lib/i18n/config";

type LandingLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function LandingLayout({
  children
}: LandingLayoutProps) {
  return <>{children}</>;
}