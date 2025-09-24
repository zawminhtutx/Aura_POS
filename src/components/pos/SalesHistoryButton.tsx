import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { SalesHistoryDialog } from './SalesHistoryDialog';
export function SalesHistoryButton() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setDialogOpen(true)}>
        <History className="h-4 w-4" />
        <span className="sr-only">View Sales History</span>
      </Button>
      <SalesHistoryDialog isOpen={isDialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}