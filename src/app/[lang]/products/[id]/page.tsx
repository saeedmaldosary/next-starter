import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getDictionary } from "@/dictionaries";
import { notFound } from "next/navigation";

// Mock product data - in a real app, this would come from an API or database
const products = {
  "1": {
    id: 1,
    title: "Product 1",
    description: "Detailed description for product 1",
    price: 99.99,
    features: ["Feature 1", "Feature 2", "Feature 3"]
  },
  "2": {
    id: 2,
    title: "Product 2",
    description: "Detailed description for product 2",
    price: 149.99,
    features: ["Feature 1", "Feature 2", "Feature 3"]
  },
  "3": {
    id: 3,
    title: "Product 3",
    description: "Detailed description for product 3",
    price: 199.99,
    features: ["Feature 1", "Feature 2", "Feature 3"]
  }
};

export default async function ProductDetail({
  params
}: {
  params: { lang: string; id: string };
}) {
  const { lang, id } = await params;
  const t = await getDictionary(lang);

  const product = products[id as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">${product.price}</p>
              <Button>{t.products.addToCart}</Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t.products.features}</h3>
              <ul className="list-disc pl-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
