import { env } from "@/lib/env";
import {
  Product,
  ProductFormData,
  PaginatedResponse,
  ProductStatus
} from "@/types/products";

const baseURL = env.BASE_URL;
const errorsPrefix = "api.errors";

function transformProductFormData(data: ProductFormData) {
  return {
    ...data,
    status: Number(data.status) as ProductStatus,
    price: Number(data.price)
  };
}

export const productService = {
  async getProducts(page = 0, size = 10): Promise<PaginatedResponse<Product>> {
    const response = await fetch(
      `${baseURL}/products?page=${page}&size=${size}`
    );
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.fetchProducts`);
    }
    return response.json();
  },

  async createProduct(productData: ProductFormData): Promise<Product> {
    const submissionData = transformProductFormData(productData);
    const response = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submissionData)
    });
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.createProduct`);
    }
    return response.json();
  },

  async updateProduct(
    id: string,
    productData: ProductFormData
  ): Promise<Product> {
    const submissionData = transformProductFormData(productData);
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submissionData)
    });
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.updateProduct`);
    }
    return response.json();
  },

  async deleteProduct(id: string): Promise<boolean> {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.deleteProduct`);
    }
    return true;
  }
};
