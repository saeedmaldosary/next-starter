"use client";
import { Link, usePathname } from "@/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  GlobeAltIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import logo from "@/images/logo.png";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header");
  const headerKeys = ["home", "products", "contactUs"];
  const currentPath = usePathname();

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
                const path = value === "home" ? "/" : `/${value}`;
                const isActive =
                  value === "home"
                    ? currentPath === `/`
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <GlobeAltIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={currentPath} locale="en">
                    English
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={currentPath} locale="ar">
                    العربية
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
