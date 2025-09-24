import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/components/ui/sonner";
import { CreditCard, Landmark, Loader2, Wallet } from "lucide-react";
import { api } from "@/lib/api-client";
import type { Sale } from "@shared/types";
interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount: number;
}
export function PaymentDialog({ isOpen, onOpenChange, totalAmount }: PaymentDialogProps) {
  const { items, getSummary, clearCart } = useCartStore.getState();
  const [isProcessing, setIsProcessing] = useState(false);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  const handleCompleteSale = async () => {
    setIsProcessing(true);
    try {
      const summary = getSummary();
      const saleData: Omit<Sale, 'id' | 'createdAt'> = {
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: summary.subtotal,
        tax: summary.tax,
        total: summary.total,
      };
      const result = await api<{ message: string; saleId: string }>('/api/sales', {
        method: 'POST',
        body: JSON.stringify(saleData),
      });
      clearCart();
      toast.success("Sale Completed!", {
        description: `Sale ID: ${result.saleId}`,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to complete sale:", error);
      toast.error("Failed to record sale", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Complete Payment</DialogTitle>
          <DialogDescription>
            Total amount due: <span className="font-bold text-primary">{formatCurrency(totalAmount)}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Select Payment Method</p>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Wallet className="h-6 w-6" />
              Cash
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 ring-2 ring-primary shadow-md">
              <CreditCard className="h-6 w-6" />
              Card
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Landmark className="h-6 w-6" />
              Bank
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleCompleteSale} disabled={isProcessing}>
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}