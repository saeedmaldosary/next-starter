// services/products.ts
import { env } from "@/lib/env";
import {
  Product,
  ProductCreate,
  ProductUpdate,
  PaginatedResponse
} from "@/types/products";

const baseURL = env.BASE_URL;
const errorsPrefix = "api.errors";

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

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${baseURL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.fetchProduct`);
    }
    return response.json();
  },

  async createProduct(productData: ProductCreate): Promise<Product> {
    const response = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.createProduct`);
    }
    return response.json();
  },

  async updateProduct(
    id: string,
    productData: ProductUpdate
  ): Promise<Product> {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
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
  },

  async getStatusOptions(): Promise<Array<"available" | "unavailable">> {
    const response = await fetch(`${baseURL}/status`);
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.fetchStatus`);
    }
    return response.json();
  }
};
