// types/products.ts
export enum ProductStatus {
  UNAVAILABLE = 0,
  AVAILABLE = 1
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
}

export interface ProductCreate {
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
}

export interface ProductUpdate {
  title?: string;
  description?: string;
  price?: number;
  status?: ProductStatus;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
