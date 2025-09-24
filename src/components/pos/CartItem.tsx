import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import type { CartItem as CartItemType } from "@shared/types";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
interface CartItemProps {
  item: CartItemType;
}
export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4 py-3"
    >
      <div className="flex-grow">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
          className="h-7 w-12 text-center px-0"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div className="w-20 text-right font-medium text-sm">
        {formatCurrency(item.price * item.quantity)}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-destructive"
        onClick={() => removeItem(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}