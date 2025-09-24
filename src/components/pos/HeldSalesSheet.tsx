import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore, HeldCart } from "@/store/cartStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Play, Trash2, Hourglass } from "lucide-react";
import { format } from 'date-fns';
interface HeldSalesSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
function HeldSaleCard({ cart, onResume, onDiscard }: { cart: HeldCart; onResume: (id: string) => void; onDiscard: (id: string) => void; }) {
  return (
    <div className="p-4 border rounded-lg bg-background hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} - {formatCurrency(cart.total)}
          </p>
          <p className="text-sm text-muted-foreground">
            Held on {format(new Date(cart.createdAt), 'MMM d, h:mm a')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onResume(cart.id)}>
            <Play className="h-4 w-4 mr-2" />
            Resume
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDiscard(cart.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Separator className="my-3" />
      <ul className="text-sm text-muted-foreground space-y-1 max-h-24 overflow-y-auto">
        {cart.items.map(item => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name} <span className="text-xs">(x{item.quantity})</span></span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export function HeldSalesSheet({ isOpen, onOpenChange }: HeldSalesSheetProps) {
  const heldCarts = useCartStore((state) => state.heldCarts);
  const resumeCart = useCartStore((state) => state.resumeCart);
  const discardHeldCart = useCartStore((state) => state.discardHeldCart);
  const handleResume = (cartId: string) => {
    resumeCart(cartId);
    onOpenChange(false);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Held Sales</SheetTitle>
          <SheetDescription>
            Manage sales that have been put on hold.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow my-4">
          <ScrollArea className="h-full pr-4 -mr-4">
            {heldCarts.length > 0 ? (
              <div className="space-y-4">
                {heldCarts.map(cart => (
                  <HeldSaleCard key={cart.id} cart={cart} onResume={handleResume} onDiscard={discardHeldCart} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Hourglass className="h-12 w-12 mb-4" />
                <p className="font-medium">No sales on hold</p>
                <p className="text-sm">Use the "Hold" button to save a sale for later.</p>
              </div>
            )}
          </ScrollArea>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}