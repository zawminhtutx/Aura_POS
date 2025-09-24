import { useHotkeys } from 'react-hotkeys-hook';
import { useCartStore } from '@/store/cartStore';
type UsePosKeysProps = {
  onPay: () => void;
};
export function usePosKeys({ onPay }: UsePosKeysProps) {
  const holdCurrentCart = useCartStore((state) => state.holdCurrentCart);
  const items = useCartStore((state) => state.items);
  // Focus search input: Ctrl+F or /
  useHotkeys('ctrl+f, /', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('product-search-input') as HTMLInputElement;
    searchInput?.focus();
    searchInput?.select();
  }, { preventDefault: true });
  // Open payment dialog: Ctrl+P
  useHotkeys('ctrl+p', (event) => {
    event.preventDefault();
    if (items.length > 0) {
      onPay();
    }
  }, { preventDefault: true }, [items, onPay]);
  // Hold current sale: Ctrl+H
  useHotkeys('ctrl+h', (event) => {
    event.preventDefault();
    if (items.length > 0) {
      holdCurrentCart();
    }
  }, { preventDefault: true }, [items, holdCurrentCart]);
}