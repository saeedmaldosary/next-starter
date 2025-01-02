"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("formTitle")}</CardTitle>
            <CardDescription>{t("formDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input placeholder={t("namePlaceholder")} />
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder={t("emailPlaceholder")} />
            </div>
            <div className="space-y-2">
              <Input placeholder={t("messagePlaceholder")} />
            </div>
            <Button className="w-full">{t("submitButton")}</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
