import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDictionary } from "@/dictionaries";

export default async function Contact({
  params
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{t.contact.formTitle}</CardTitle>
            <CardDescription>{t.contact.formDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input placeholder={t.contact.namePlaceholder} />
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder={t.contact.emailPlaceholder} />
            </div>
            <div className="space-y-2">
              <Input placeholder={t.contact.messagePlaceholder} />
            </div>
            <Button className="w-full">{t.contact.submitButton}</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
