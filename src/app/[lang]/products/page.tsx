// app/[lang]/products/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";

// Mock product data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    title: "Product 1",
    description: "Description for product 1",
    price: 99.99
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description for product 2",
    price: 149.99
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description for product 3",
    price: 199.99
  }
];

export default async function Products({
  params
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/en/products">English</Link>
          <span className="mx-2">|</span>
          <Link href="/ar/products">العربيه</Link>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{t.products.title}</h1>
          <Link href={`/${lang}`}>
            <Button variant="outline">{t.products.backToHome}</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">${product.price}</p>
                  <Link href={`/${lang}/products/${product.id}`}>
                    <Button variant="outline">{t.products.viewDetails}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
