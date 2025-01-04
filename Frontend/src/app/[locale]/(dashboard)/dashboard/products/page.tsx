"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { useTranslations } from "next-intl";

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

const headers = [
  { key: "title", translationKey: "columnTitle" },
  { key: "description", translationKey: "columnDescription" },
  { key: "price", translationKey: "columnPrice", className: "text-right" },
  { key: "actions", translationKey: "columnActions", className: "w-24" }
];

export default function Products() {
  const t = useTranslations("products");

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header.key} className={header.className}>
                  {t(header.translationKey)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-right">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Link href={`products/${product.id}`}>
                    <Button variant="outline" size="sm">
                      {t("viewDetails")}
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
