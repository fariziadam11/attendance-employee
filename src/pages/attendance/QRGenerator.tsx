import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw, Download } from 'lucide-react';

const QRGenerator: React.FC = () => {
  const [qrValue, setQrValue] = useState('');
  const [expiryTime, setExpiryTime] = useState(5 * 60); // 5 minutes in seconds
  
  const generateQRCode = () => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const value = `attendance-${timestamp}-${randomString}`;
    setQrValue(value);
    setExpiryTime(5 * 60);
  };
  
  useEffect(() => {
    generateQRCode();
    const interval = setInterval(() => {
      setExpiryTime((prev) => {
        if (prev <= 1) {
          generateQRCode();
          return 5 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `attendance-qr-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  
  return (
    <div className="animate-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Attendance QR Code
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Generate a QR code for employees to scan and record their attendance
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="card flex flex-col items-center justify-center">
          <div className="mb-6 rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
            <QRCodeSVG
              id="qr-code-canvas"
              value={qrValue}
              size={250}
              level="H"
              includeMargin
              bgColor={"#FFFFFF"}
              fgColor={"#000000"}
            />
          </div>
          
          <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-primary">
            <p>Expires in <span className="font-bold">{formatTime(expiryTime)}</span></p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={generateQRCode}
              className="btn-outline btn-md flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Regenerate
            </button>
            <button
              onClick={downloadQRCode}
              className="btn-primary btn-md flex items-center gap-2"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </div>
        
        <div className="card">
          <h2 className="mb-4 text-xl font-semibold">Instructions</h2>
          
          <div className="mb-6 space-y-4">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h3 className="mb-2 text-lg font-medium">How it works</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This QR code automatically regenerates every 5 minutes for security purposes. 
                Employees can scan this code using the EMS mobile app or the QR scanner in the web app.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h3 className="mb-2 text-lg font-medium">Setting up attendance</h3>
              <ol className="ml-4 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
                <li>Generate or download the QR code</li>
                <li>Display it on a screen or print it out</li>
                <li>Place it in a location accessible to employees</li>
                <li>Employees scan the code when arriving and leaving</li>
              </ol>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h3 className="mb-2 text-lg font-medium">Best practices</h3>
              <ul className="ml-4 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>Place the QR code in a well-lit area</li>
                <li>Ensure stable internet connection for scanning</li>
                <li>Regularly check that the QR code is functioning</li>
                <li>Generate a new code if security is compromised</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;