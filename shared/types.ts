export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// Aura POS Types
export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  imageUrl: string;
  description: string;
}
export interface CartItem extends Product {
  quantity: number;
}
export interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
export interface Sale {
  id: string;
  createdAt: number; // epoch millis
  items: SaleItem[];
  subtotal: number;
  tax: number;
  total: number;
}