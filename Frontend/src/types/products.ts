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

export const defaultValues = {
  title: "",
  description: "",
  price: 0,
  status: unavailable.toString()
};

export const getProductFormDefaults = (product?: Product): ProductCreate => {
  if (!product) return DEFAULT_PRODUCT_VALUES;

  return {
    title: product.title,
    description: product.description,
    price: product.price,
    status: product.status.toString()
  };
};
