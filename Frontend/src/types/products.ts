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

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  status: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export const defaultValues: ProductFormData = {
  title: "",
  description: "",
  price: 0,
  status: ProductStatus.UNAVAILABLE.toString()
};

export const getProductFormDefaults = (product?: Product): ProductFormData => {
  if (!product) return defaultValues;

  return {
    title: product.title,
    description: product.description,
    price: product.price,
    status: product.status.toString()
  };
};
