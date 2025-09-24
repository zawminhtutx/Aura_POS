import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pause } from 'lucide-react';
import { HeldSalesSheet } from './HeldSalesSheet';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/components/ui/badge';
export function HeldSalesButton() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const heldCartsCount = useCartStore((state) => state.heldCarts.length);
  return (
    <>
      <Button variant="outline" size="icon" className="relative" onClick={() => setSheetOpen(true)}>
        <Pause className="h-4 w-4" />
        {heldCartsCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {heldCartsCount}
          </Badge>
        )}
        <span className="sr-only">View Held Sales</span>
      </Button>
      <HeldSalesSheet isOpen={isSheetOpen} onOpenChange={setSheetOpen} />
    </>
  );
}