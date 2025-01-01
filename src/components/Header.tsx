"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

interface HeaderProps {
  lang: string;
  t: {
    header: Record<string, string>;
  };
  currentPath: string;
}

export function Header({ lang, t }: HeaderProps) {
  const currentPath = usePathname();

  const getPathWithNewLang = (newLang: string) => {
    const pathWithoutLang = currentPath.substring(3);
    return `/${newLang}${pathWithoutLang}`;
  };

  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo with Link */}
            <Link href={`/${lang}`} className="flex items-center">
              <Image
                src={logo}
                alt="Logo"
                width="0"
                height="0"
                priority
                style={{ width: "70%", height: "auto" }}
              />
            </Link>
            {/* Navigation */}
            <nav className="flex items-center gap-6">
              {Object.entries(t.header).map(([key, value]) => {
                const path = key === "home" ? `/${lang}` : `/${lang}/${key}`;
                const isActive =
                  key === "home"
                    ? currentPath === `/${lang}`
                    : currentPath.includes(`/${key}`);
                return (
                  <Link
                    key={key}
                    href={path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {value}
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
                  <Link href={getPathWithNewLang("en")}>English</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={getPathWithNewLang("ar")}>العربية</Link>
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
