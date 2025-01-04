// services/products.ts
import { env } from "@/lib/env";

const baseURL = env.BASE_URL;
const errorsPrefix = "api.errors";

export const productService = {
  async getProducts(page = 0, size = 10) {
    const response = await fetch(
      `${baseURL}/products?page=${page}&size=${size}`
    );
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.fetchProducts`);
    }
    return response.json();
  },

  async getProduct(id) {
    const response = await fetch(`${baseURL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.fetchProduct`);
    }
    return response.json();
  },

  async createProduct(productData) {
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

  async updateProduct(id, productData) {
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

  async deleteProduct(id) {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.deleteProduct`);
    }
    return true;
  },

  async getStatusOptions() {
    const response = await fetch(`${baseURL}/status`);
    if (!response.ok) {
      throw new Error(`${errorsPrefix}.fetchStatus`);
    }
    return response.json();
  }
};
