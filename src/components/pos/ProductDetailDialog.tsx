import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@shared/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/sonner";
interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ProductDetailDialog({ product, isOpen, onOpenChange }: ProductDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const { items, addItem, updateQuantity: updateCartQuantity } = useCartStore();
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);
  if (!product) return null;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart.`);
    onOpenChange(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-2">
          <div className="aspect-square rounded-lg overflow-hidden border">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-3xl font-display">{product.name}</DialogTitle>
              <div className="flex items-center gap-4 pt-2">
                <p className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
                <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </Badge>
              </div>
            </DialogHeader>
            <DialogDescription className="text-base text-muted-foreground flex-grow">
              {product.description}
            </DialogDescription>
            <p className="text-xs text-muted-foreground mt-4">SKU: {product.sku}</p>
            <DialogFooter className="mt-6 sm:justify-start gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} className="h-10 w-16 text-center font-bold" />
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAddToCart} className="w-full sm:w-auto" disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}