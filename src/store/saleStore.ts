import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { Sale } from '@shared/types';
type SaleState = {
  sales: Sale[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  fetchSales: () => Promise<void>;
};
export const useSaleStore = create<SaleState>((set) => ({
  sales: [],
  status: 'idle',
  error: null,
  fetchSales: async () => {
    set({ status: 'loading', error: null });
    try {
      const sales = await api<Sale[]>('/api/sales');
      // Sort sales by most recent first
      const sortedSales = sales.sort((a, b) => b.createdAt - a.createdAt);
      set({ sales: sortedSales, status: 'success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ status: 'error', error: errorMessage });
      console.error("Failed to fetch sales:", error);
    }
  },
}));