import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Locale } from "@/lib/i18n/config";

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Toaster />
    </>
  );
}
