import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSaleStore } from '@/store/saleStore';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Inbox } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
interface SalesHistoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
export function SalesHistoryDialog({ isOpen, onOpenChange }: SalesHistoryDialogProps) {
  const sales = useSaleStore((state) => state.sales);
  const status = useSaleStore((state) => state.status);
  const fetchSales = useSaleStore((state) => state.fetchSales);
  useEffect(() => {
    if (isOpen && status === 'idle') {
      fetchSales();
    }
  }, [isOpen, status, fetchSales]);
  const renderContent = () => {
    if (status === 'loading' || status === 'idle') {
      return (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      );
    }
    if (status === 'error') {
      return (
        <div className="flex flex-col items-center justify-center text-center text-destructive py-10">
          <AlertCircle className="h-12 w-12 mb-4" />
          <p className="font-semibold">Failed to load sales history</p>
          <p className="text-sm">Please try again later.</p>
        </div>
      );
    }
    if (sales.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10">
          <Inbox className="h-12 w-12 mb-4" />
          <p className="font-semibold">No sales recorded yet</p>
          <p className="text-sm">Completed sales will appear here.</p>
        </div>
      );
    }
    return (
      <Accordion type="single" collapsible className="w-full">
        {sales.map((sale) => {
          const totalItems = sale.items.reduce((sum, item) => sum + item.quantity, 0);
          return (
            <AccordionItem value={sale.id} key={sale.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="grid grid-cols-4 gap-4 text-sm text-left w-full pr-4">
                  <div className="truncate font-mono text-xs">{sale.id.split('-')[0]}...</div>
                  <div>{format(new Date(sale.createdAt), 'MMM d, yyyy h:mm a')}</div>
                  <div>{totalItems} {totalItems === 1 ? 'item' : 'items'}</div>
                  <div className="font-semibold text-right">{formatCurrency(sale.total)}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/50 p-4 rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sale.items.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(item.price * item.quantity)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end gap-8 mt-4 pt-4 border-t text-sm">
                      <div className="text-right">
                          <p className="text-muted-foreground">Subtotal</p>
                          <p className="font-medium">{formatCurrency(sale.subtotal)}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-muted-foreground">Tax</p>
                          <p className="font-medium">{formatCurrency(sale.tax)}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-muted-foreground">Total</p>
                          <p className="font-bold text-base">{formatCurrency(sale.total)}</p>
                      </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Sales History</DialogTitle>
          <DialogDescription>Review all completed transactions.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}