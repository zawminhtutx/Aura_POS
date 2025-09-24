import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "./CartItem";
import { PaymentDialog } from "./PaymentDialog";
import { ShoppingCart, Trash2, Pause } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
export function TransactionCart() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const holdCurrentCart = useCartStore((state) => state.holdCurrentCart);
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const { subtotal, tax, total, totalItems } = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // Mock 8% tax
    const total = subtotal + tax;
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    return { subtotal, tax, total, totalItems };
  }, [items]);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-display text-2xl">Current Sale</CardTitle>
          <div className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-0">
          <div className="px-6">
            <AnimatePresence>
              {items.length > 0 ? (
                items.map(item => <CartItem key={item.id} item={item} />)
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-16"
                >
                  <ShoppingCart className="h-12 w-12 mb-4" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm">Add products from the catalog to get started.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
        {items.length > 0 && (
          <CardFooter className="flex-col items-stretch p-6 space-y-4 bg-muted/50 dark:bg-card border-t">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <Button variant="outline" onClick={clearCart}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button variant="outline" onClick={holdCurrentCart}>
                <Pause className="mr-2 h-4 w-4" />
                Hold
              </Button>
              <Button
                onClick={() => setPaymentDialogOpen(true)}
                className="pay-now-button font-semibold text-base py-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 col-span-3 sm:col-span-1"
              >
                Pay Now
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        totalAmount={total}
      />
    </>
  );
}