import api from "./api";
import type { Product, ProductsResponse, ProductFormData } from "@/types/product";

export const productService = {
  getProducts: async (limit = 10, skip = 0): Promise<ProductsResponse> => {
    const { data } = await api.get<ProductsResponse>("/products", {
      params: { limit, skip },
    });
    return data;
  },

  searchProducts: async (q: string): Promise<ProductsResponse> => {
    const { data } = await api.get<ProductsResponse>("/products/search", {
      params: { q },
    });
    return data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  addProduct: async (product: ProductFormData): Promise<Product> => {
    const { data } = await api.post<Product>("/products/add", product);
    return data;
  },

  updateProduct: async (id: number, product: ProductFormData): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  },

  deleteProduct: async (id: number): Promise<Product> => {
    const { data } = await api.delete<Product>(`/products/${id}`);
    return data;
  },
};
