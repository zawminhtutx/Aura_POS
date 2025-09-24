import { Button } from "@/components/ui/button";
import { ScanLine } from "lucide-react";
interface BarcodeScannerButtonProps {
  onClick: () => void;
}
export function BarcodeScannerButton({ onClick }: BarcodeScannerButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={onClick}
    >
      <ScanLine className="mr-2 h-4 w-4" />
      Scan Barcode
    </Button>
  );
}