import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { CartItem, Product } from '@shared/types';
import { toast } from '@/components/ui/sonner';
export type HeldCart = {
  id: string;
  items: CartItem[];
  createdAt: number;
  totalItems: number;
  total: number;
};
type CartState = {
  items: CartItem[];
  heldCarts: HeldCart[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  holdCurrentCart: () => void;
  resumeCart: (cartId: string) => void;
  discardHeldCart: (cartId: string) => void;
  getSummary: () => {
    subtotal: number;
    tax: number;
    total: number;
    totalItems: number;
  };
};
export const useCartStore = create(
  immer<CartState>((set, get) => ({
    items: [],
    heldCarts: [],
    addItem: (product, quantity = 1) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ ...product, quantity });
        }
      });
    },
    removeItem: (productId) => {
      set((state) => {
        state.items = state.items.filter((item) => item.id !== productId);
      });
    },
    updateQuantity: (productId, quantity) => {
      set((state) => {
        const item = state.items.find((item) => item.id === productId);
        if (item) {
          if (quantity > 0) {
            item.quantity = quantity;
          } else {
            state.items = state.items.filter((i) => i.id !== productId);
          }
        }
      });
    },
    clearCart: () => {
      set({ items: [] });
    },
    holdCurrentCart: () => {
      const { items, getSummary } = get();
      if (items.length === 0) {
        toast.warning("Cannot hold an empty cart.");
        return;
      }
      const summary = getSummary();
      const newHeldCart: HeldCart = {
        id: `held_${crypto.randomUUID()}`,
        items: items,
        createdAt: Date.now(),
        totalItems: summary.totalItems,
        total: summary.total,
      };
      set((state) => {
        state.heldCarts.push(newHeldCart);
        state.items = [];
      });
      toast.info("Sale Held", { description: "The current sale has been saved." });
    },
    resumeCart: (cartId: string) => {
      const { items, heldCarts } = get();
      if (items.length > 0) {
        toast.error("Cannot resume sale", {
          description: "Please hold or clear the current sale first.",
        });
        return;
      }
      const cartToResume = heldCarts.find(c => c.id === cartId);
      if (cartToResume) {
        set(state => {
          state.items = cartToResume.items;
          state.heldCarts = state.heldCarts.filter(c => c.id !== cartId);
        });
        toast.success("Sale Resumed", { description: "The held sale is now active." });
      }
    },
    discardHeldCart: (cartId: string) => {
      set(state => {
        state.heldCarts = state.heldCarts.filter(c => c.id !== cartId);
      });
      toast.warning("Held Sale Discarded");
    },
    getSummary: () => {
      const items = get().items;
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const tax = subtotal * 0.08; // Mock 8% tax
      const total = subtotal + tax;
      const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
      return { subtotal, tax, total, totalItems };
    },
  }))
);