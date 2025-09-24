import { useEffect, useState, useCallback } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useProductStore } from '@/store/productStore';
import { ProductCatalog } from '@/components/pos/ProductCatalog';
import { TransactionCart } from '@/components/pos/TransactionCart';
import { SalesHistoryButton } from '@/components/pos/SalesHistoryButton';
import { HeldSalesButton } from '@/components/pos/HeldSalesButton';
import { usePosKeys } from '@/hooks/usePosKeys';
import { useCartStore } from '@/store/cartStore';
import { WifiOff } from 'lucide-react';
export function HomePage() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const productStatus = useProductStore((state) => state.status);
  const items = useCartStore((state) => state.items);
  const handlePay = useCallback(() => {
    if (items.length > 0) {
      // This is a pragmatic way to trigger a component's internal state change from a parent
      // without complex state lifting or context, suitable for this specific case.
      const payButton = document.querySelector('.pay-now-button') as HTMLElement;
      if (payButton) {
        payButton.click();
      }
    }
  }, [items]);
  usePosKeys({ onPay: handlePay });
  useEffect(() => {
    if (productStatus === 'idle') {
      fetchProducts();
    }
  }, [fetchProducts, productStatus]);
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <circle cx="12" cy="12" r="10" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
            <path d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6Z" fill="hsl(var(--primary))" fillOpacity="0.3"/>
            <path d="M12 14C9.79086 14 8 15.7909 8 18H16C16 15.7909 14.2091 14 12 14Z" fill="hsl(var(--primary))" fillOpacity="0.3"/>
          </svg>
          <h1 className="text-xl font-bold font-display tracking-tight">Aura POS</h1>
        </div>
        <div className="flex items-center gap-4">
          {productStatus === 'error' && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <WifiOff className="h-4 w-4" />
              <span>Offline</span>
            </div>
          )}
          <HeldSalesButton />
          <SalesHistoryButton />
          <ThemeToggle className="relative top-0 right-0" />
        </div>
      </header>
      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-8rem)]">
          <div className="lg:col-span-2 h-full">
            <TransactionCart />
          </div>
          <div className="lg:col-span-3 h-full">
            <ProductCatalog />
          </div>
        </div>
      </main>
      <Toaster richColors position="top-right" />
      <footer className="text-center py-4 text-sm text-muted-foreground">
        Built with ❤️ at Cloudflare
      </footer>
    </div>
  );
}