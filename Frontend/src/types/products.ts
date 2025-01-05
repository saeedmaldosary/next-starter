// types/products.ts
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  status: "available" | "unavailable";
}

export interface ProductCreate {
  title: string;
  description: string;
  price: number;
  status: "available" | "unavailable";
}

export interface ProductUpdate {
  title?: string;
  description?: string;
  price?: number;
  status?: "available" | "unavailable";
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
