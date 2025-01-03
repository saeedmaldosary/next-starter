"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { HomeIcon } from "@heroicons/react/24/solid";
import { HomeIcon as HomeIconOutline } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex gap-2">
          <HomeIcon className="h-6 w-6" />
          <HomeIconOutline className="h-6 w-6" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("welcome")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder={t("inputPlaceholder")} />
            <Button>{t("button")}</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
