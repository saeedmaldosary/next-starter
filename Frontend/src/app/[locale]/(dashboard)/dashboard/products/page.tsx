"use client";

import { useState, useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Package, Plus } from "lucide-react";
import { productService } from "@/services/products";
import { Product } from "@/types/products";
import { toast } from "@/hooks/use-toast";

const useProducts = (page = 0, size = 2) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (pageNum = page) => {
    try {
      setLoading(true);
      const data = await productService.getProducts(pageNum, size);
      setProducts(data.content);
      setPagination({
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        currentPage: data.number
      });
    } catch {
      setError("api.errors.fetchProducts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  return { products, pagination, loading, error, fetchProducts };
};
type TFunction = ReturnType<typeof useTranslations>;

const EmptyState = ({ t }: { t: TFunction }) => (
  <div className="text-center py-12">
    <Package className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-lg font-semibold text-gray-900">
      {t("noProducts")}
    </h3>
    <p className="mt-1 text-sm text-gray-500">{t("noProductsDescription")}</p>
  </div>
);

const headers = [
  { key: "title", translationKey: "columnTitle" },
  { key: "description", translationKey: "columnDescription" },
  { key: "price", translationKey: "columnPrice", className: "text-right" },
  { key: "status", translationKey: "columnStatus" },
  { key: "actions", translationKey: "columnActions", className: "w-24" }
];

export default function Products() {
  const t = useTranslations("products");

  const [currentPage, setCurrentPage] = useState(0);
  const { products, pagination, loading, error, fetchProducts } =
    useProducts(currentPage);

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      if (products.length === 1 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchProducts(currentPage);
      }
    } catch (err) {
      const error = err as Error;
      toast({
        title: t("error"),
        description: t(error.message),
        variant: "destructive"
      });
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <Link href="/products/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("addProduct")}
            </Button>
          </Link>
        </div>

        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4"> {t(error)}</div>
            <Button onClick={() => fetchProducts(currentPage)}>
              {t("tryAgain")}
            </Button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : products.length === 0 && pagination.totalElements === 0 ? (
          <EmptyState t={t} />
        ) : (
          <>
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
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell className="text-right">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 whitespace-nowrap rounded-full text-sm ${
                          product.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline" size="sm">
                            {t("viewDetails")}
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          {t("delete")}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {pagination.totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {currentPage === 0 ? (
                        <PaginationPrevious
                          className="pointer-events-none opacity-50"
                          onClick={() => {}}
                        />
                      ) : (
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(0, prev - 1))
                          }
                        />
                      )}
                    </PaginationItem>
                    {[...Array(pagination.totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => setCurrentPage(index)}
                          isActive={currentPage === index}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      {currentPage === pagination.totalPages - 1 ? (
                        <PaginationNext
                          className="pointer-events-none opacity-50"
                          onClick={() => {}}
                        />
                      ) : (
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(pagination.totalPages - 1, prev + 1)
                            )
                          }
                        />
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
