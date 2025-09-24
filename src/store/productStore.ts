import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Product } from '@shared/types';
type ProductState = {
  products: Product[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  fetchProducts: () => Promise<void>;
  findProductBySku: (sku: string) => Product | undefined;
};
export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  status: 'idle',
  error: null,
  fetchProducts: async () => {
    set({ status: 'loading', error: null });
    try {
      const products = await api<Product[]>('/api/products');
      set({ products, status: 'success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ status: 'error', error: errorMessage });
      console.error("Failed to fetch products:", error);
    }
  },
  findProductBySku: (sku: string) => {
    return get().products.find(p => p.sku === sku);
  }
}));