import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, PackageX } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { ProductCard } from "./ProductCard";
import { BarcodeScannerButton } from "./BarcodeScannerButton";
import { BarcodeScannerDialog } from './BarcodeScannerDialog';
import { ProductDetailDialog } from './ProductDetailDialog';
import type { Product } from "@shared/types";
import { toast } from '@/components/ui/sonner';
export function ProductCatalog() {
  const products = useProductStore((state) => state.products);
  const status = useProductStore((state) => state.status);
  const addItemToCart = useCartStore((state) => state.addItem);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailViewOpen, setDetailViewOpen] = useState(false);
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  const handleQuickAddToCart = (product: Product) => {
    addItemToCart(product);
    toast.success(`${product.name} added to cart.`);
  };
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setDetailViewOpen(true);
  };
  return (
    <>
      <div className="flex flex-col h-full bg-card p-4 sm:p-6 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="product-search"
              placeholder="Search products or SKU... ( / )"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <BarcodeScannerButton onClick={() => setScannerOpen(true)} />
        </div>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          {status === 'loading' && (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {status === 'success' && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleQuickAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
          {status === 'success' && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <PackageX className="h-12 w-12 mb-4" />
              <p className="font-semibold">No products found</p>
              <p className="text-sm">Your search for "{searchTerm}" did not match any products.</p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center text-destructive">Failed to load products.</div>
          )}
        </div>
      </div>
      <BarcodeScannerDialog isOpen={isScannerOpen} onOpenChange={setScannerOpen} />
      <ProductDetailDialog
        isOpen={isDetailViewOpen}
        onOpenChange={setDetailViewOpen}
        product={selectedProduct}
      />
    </>
  );
}