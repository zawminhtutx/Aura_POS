import { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/components/ui/sonner';
import { CameraOff } from 'lucide-react';
interface BarcodeScannerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
const QR_REGION_ID = "qr-code-full-region";
export function BarcodeScannerDialog({ isOpen, onOpenChange }: BarcodeScannerDialogProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const findProductBySku = useProductStore((state) => state.findProductBySku);
  const addItem = useCartStore((state) => state.addItem);
  useEffect(() => {
    if (isOpen) {
      // Camera APIs require a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
        toast.error("Camera access requires a secure connection (HTTPS).");
        onOpenChange(false);
        return;
      }
      const startScanner = async () => {
        try {
          const devices = await Html5Qrcode.getCameras();
          if (devices && devices.length) {
            const scanner = new Html5Qrcode(QR_REGION_ID, { verbose: false });
            scannerRef.current = scanner;
            await scanner.start(
              { facingMode: "environment" },
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
              },
              (decodedText, _decodedResult) => {
                scanner.pause(true);
                const product = findProductBySku(decodedText);
                if (product) {
                  addItem(product);
                  toast.success(`Added ${product.name} to cart.`);
                } else {
                  toast.error("Product not found", {
                    description: `No product with SKU: ${decodedText}`,
                  });
                }
                setTimeout(() => {
                    if (scannerRef.current?.getState() === Html5QrcodeScannerState.PAUSED) {
                        scanner.resume();
                    }
                }, 1000);
              },
              (_errorMessage) => {
                // handle scan failure, usually better to ignore
              }
            );
          } else {
            throw new Error("No cameras found on this device.");
          }
        } catch (err) {
          console.error("Error starting scanner:", err);
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
          toast.error("Could not start camera.", {
            description: "Please ensure camera permissions are granted. " + errorMessage,
          });
          onOpenChange(false);
        }
      };
      startScanner();
    }
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error("Failed to stop scanner:", err));
      }
      scannerRef.current = null;
    };
  }, [isOpen, onOpenChange, findProductBySku, addItem]);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Barcode</DialogTitle>
          <DialogDescription>
            Position the product's barcode within the frame.
          </DialogDescription>
        </DialogHeader>
        <div id={QR_REGION_ID} className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center gap-2">
                <CameraOff className="h-8 w-8" />
                <p>Initializing camera...</p>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}