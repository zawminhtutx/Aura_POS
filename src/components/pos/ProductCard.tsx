import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/types";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}
export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-200 hover:shadow-xl dark:hover:shadow-primary/20 group relative"
        onClick={() => onViewDetails(product)}
      >
        <CardHeader className="p-0">
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-base leading-snug truncate text-foreground">{product.name}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-lg font-bold text-primary">{formatCurrency(product.price)}</p>
        </CardFooter>
        <Button
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-background/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary hover:text-primary-foreground"
          onClick={handleQuickAddClick}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Quick Add</span>
        </Button>
      </Card>
    </motion.div>
  );
}