import { create } from "zustand";
import { goeyToast } from "goey-toast";
import type { Product, ProductFormData } from "@/types/product";
import { productService } from "@/services/productService";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  searchProducts: (q: string) => Promise<void>;
  fetchProduct: (id: number) => Promise<void>;
  addProduct: (data: ProductFormData) => Promise<void>;
  updateProduct: (id: number, data: ProductFormData) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  clearSelected: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,

  fetchProducts: async (limit = 10, skip = 0) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.getProducts(limit, skip);
      set({ products: data.products, total: data.total, skip, limit, loading: false });
    } catch {
      set({ error: "Gagal memuat produk", loading: false });
    }
  },

  searchProducts: async (q: string) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.searchProducts(q);
      set({ products: data.products, total: data.total, loading: false });
    } catch {
      set({ error: "Gagal mencari produk", loading: false });
    }
  },

  fetchProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const product = await productService.getProduct(id);
      set({ selectedProduct: product, loading: false });
    } catch {
      set({ error: "Gagal memuat detail produk", loading: false });
    }
  },

  addProduct: async (data: ProductFormData) => {
    set({ loading: true, error: null });
    try {
      const product = await productService.addProduct(data);
      set((state) => ({
        products: [product, ...state.products],
        loading: false,
      }));
      goeyToast.success("Produk berhasil ditambahkan");
    } catch {
      set({ error: "Gagal menambah produk", loading: false });
      goeyToast.error("Gagal menambah produk");
    }
  },

  updateProduct: async (id: number, data: ProductFormData) => {
    set({ loading: true, error: null });
    try {
      const updated = await productService.updateProduct(id, data);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        selectedProduct: get().selectedProduct?.id === id ? { ...get().selectedProduct!, ...updated } : get().selectedProduct,
        loading: false,
      }));
      goeyToast.success("Produk berhasil diupdate");
    } catch {
      set({ error: "Gagal mengupdate produk", loading: false });
      goeyToast.error("Gagal mengupdate produk");
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await productService.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        total: state.total - 1,
        loading: false,
      }));
      goeyToast.success("Produk berhasil dihapus");
    } catch {
      set({ error: "Gagal menghapus produk", loading: false });
      goeyToast.error("Gagal menghapus produk");
    }
  },

  clearSelected: () => set({ selectedProduct: null }),
}));
