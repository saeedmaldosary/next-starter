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
import Link from "next/link";
import { getDictionary } from "@/dictionaries";

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/en">English</Link>
          <span className="mx-2">|</span>
          <Link href="/ar">العربيه</Link>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{t.home.title}</h1>
          <Link href={`/${lang}/contactUs`}>
            <Button variant="outline">{t.home.contactUs}</Button>
          </Link>
          <Link href={`/${lang}/products`}>
            <Button variant="outline">{t.home.viewProducts}</Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <HomeIcon className="h-6 w-6" />
          <HomeIconOutline className="h-6 w-6" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t.home.welcome}</CardTitle>
            <CardDescription>{t.home.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder={t.home.inputPlaceholder} />
            <Button>{t.home.button}</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
