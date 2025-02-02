"use client";
import { Link, usePathname, useRouter } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  GlobeAltIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import logo from "@/images/logo.png";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { signOut } from "next-auth/react";

export function Header() {
  const t = useTranslations("header");
  const headerKeys = ["home", "products", "contactUs"];
  const currentPath = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const oppositeLocale = locale === "en" ? "ar" : "en";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Logo"
                width="0"
                height="0"
                priority
                style={{ width: "100%", height: "30px" }}
              />
            </Link>
            <nav className="flex items-center gap-6">
              {Object.entries(headerKeys).map(([key, value]) => {
                const layoutPrefix = "/dashboard";
                const path =
                  value === "home" ? layoutPrefix : `${layoutPrefix}/${value}`;
                const isActive =
                  value === "home"
                    ? currentPath === layoutPrefix
                    : currentPath.includes(`/${value}`);
                return (
                  <Link
                    key={key}
                    href={path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {t(value)}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href={currentPath} locale={oppositeLocale}>
              <Button variant="ghost" size="icon">
                <GlobeAltIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
