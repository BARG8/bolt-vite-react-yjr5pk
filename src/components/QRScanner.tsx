import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X } from 'lucide-react';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onScan }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeScanner = async () => {
      if (!isOpen) return;

      try {
        // Create scanner instance
        const qrCodeId = 'qr-reader';
        scannerRef.current = new Html5Qrcode(qrCodeId);

        // Start scanning
        await scannerRef.current.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (mounted) {
              onScan(decodedText);
              // Don't stop scanner here - let cleanup handle it
            }
          },
          () => {
            // Ignore errors during scanning - these are usually just "code not found" errors
          }
        );
      } catch (err) {
        console.error('Failed to initialize scanner:', err);
        if (mounted) {
          onClose();
        }
      }
    };

    initializeScanner();

    // Cleanup function
    return () => {
      mounted = false;
      if (scannerRef.current) {
        // Check if scanner is running before attempting to stop
        if (scannerRef.current.isScanning) {
          scannerRef.current.stop()
            .catch(error => console.error('Error stopping scanner:', error));
        }
        scannerRef.current = null;
      }
    };
  }, [isOpen, onScan, onClose]);

  const handleClose = async () => {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
      }
    } catch (error) {
      console.error('Error stopping scanner:', error);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white w-full max-w-sm rounded-lg overflow-hidden relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Scan QR Code</h2>
          <p className="text-sm text-gray-500">Position the QR code within the frame</p>
        </div>

        <div className="relative aspect-square">
          <div id="qr-reader" className="w-full h-full"></div>
          <div className="absolute inset-0 border-2 border-blue-500 opacity-50 m-8 rounded-lg pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;