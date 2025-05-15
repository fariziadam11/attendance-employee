import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Camera, CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import { format } from 'date-fns';

const QRScanner: React.FC = () => {
  const { user } = useAuthStore();
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScan, setLastScan] = useState<string | null>(null);
  const [attendanceType, setAttendanceType] = useState<'check-in' | 'check-out'>('check-in');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const startScanner = async () => {
    setScanning(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Simulate a successful scan after 3 seconds
        setTimeout(() => {
          handleSuccessfulScan();
          
          // Stop the camera after successful scan
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }, 3000);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access the camera. Please check your permissions.');
      setScanning(false);
    }
  };
  
  const handleSuccessfulScan = () => {
    setScanning(false);
    setSuccess(true);
    
    const currentTime = format(new Date(), 'hh:mm:ss a');
    setLastScan(currentTime);
    
    toast.success(`${attendanceType === 'check-in' ? 'Check-in' : 'Check-out'} successful at ${currentTime}`);
    
    // Toggle the attendance type for the next scan
    setAttendanceType(attendanceType === 'check-in' ? 'check-out' : 'check-in');
    
    // Reset the success state after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
  const resetScanner = () => {
    setScanning(false);
    setSuccess(false);
    setError(null);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  return (
    <div className="animate-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Attendance Scanner
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Scan the QR code to record your attendance
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="card flex flex-col items-center justify-center p-8">
          {!scanning && !success && !error && (
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <QrCode className="h-10 w-10 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">Ready to Scan</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Click the button below to start scanning the attendance QR code
              </p>
            </div>
          )}
          
          {scanning && (
            <div className="relative mb-6 w-full max-w-sm">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                className="rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
                style={{ width: '100%', height: 'auto', maxHeight: '300px' }}
              ></video>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 animate-pulse rounded-lg border-2 border-dashed border-primary"></div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-success">Attendance Recorded</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Your {attendanceType === 'check-out' ? 'check-in' : 'check-out'} was successfully recorded at {lastScan}
              </p>
            </div>
          )}
          
          {error && (
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-error/10">
                <XCircle className="h-10 w-10 text-error" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-error">Scanning Failed</h2>
              <p className="text-gray-700 dark:text-gray-300">{error}</p>
            </div>
          )}
          
          {!scanning && (
            <button
              onClick={startScanner}
              className="btn-primary btn-lg flex items-center gap-2"
              disabled={scanning}
            >
              {success ? (
                <>
                  <RotateCw size={20} />
                  Scan Again ({attendanceType === 'check-in' ? 'Check In' : 'Check Out'})
                </>
              ) : (
                <>
                  <Camera size={20} />
                  Start Scanning ({attendanceType === 'check-in' ? 'Check In' : 'Check Out'})
                </>
              )}
            </button>
          )}
          
          {scanning && (
            <button
              onClick={resetScanner}
              className="btn-outline btn-md mt-4"
            >
              Cancel
            </button>
          )}
        </div>
        
        <div className="card">
          <h2 className="mb-6 text-xl font-semibold">Attendance Information</h2>
          
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee</p>
              <p className="text-lg font-semibold">{user?.name}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
              <p className="text-lg font-semibold">{format(new Date(), 'MMMM d, yyyy')}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Check-in</p>
              <p className="text-lg font-semibold">09:05 AM</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Check-out</p>
              <p className="text-lg font-semibold">05:30 PM</p>
            </div>
          </div>
          
          <div className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h3 className="mb-3 text-lg font-medium">Recent Attendance</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-2 dark:border-gray-800">
                <span className="font-medium">Yesterday</span>
                <div className="text-right">
                  <p className="text-sm">Check-in: <span className="font-medium">09:02 AM</span></p>
                  <p className="text-sm">Check-out: <span className="font-medium">06:15 PM</span></p>
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2 dark:border-gray-800">
                <span className="font-medium">Jul 21, 2025</span>
                <div className="text-right">
                  <p className="text-sm">Check-in: <span className="font-medium">08:58 AM</span></p>
                  <p className="text-sm">Check-out: <span className="font-medium">05:45 PM</span></p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Jul 20, 2025</span>
                <div className="text-right">
                  <p className="text-sm">Check-in: <span className="font-medium">09:10 AM</span></p>
                  <p className="text-sm">Check-out: <span className="font-medium">05:30 PM</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link to="/attendance" className="btn-outline btn-md flex-1">
              View All Records
            </Link>
            <Link to="/leave" className="btn-secondary btn-md flex-1">
              Request Leave
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;