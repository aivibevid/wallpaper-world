import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:right-auto z-50 flex items-center gap-2 rounded-2xl bg-amber-600/95 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-white shadow-xl max-w-sm">
      <WifiOff className="w-4 h-4 animate-pulse shrink-0" />
      <span>Offline Mode — Viewing cached wallpapers & favorites.</span>
    </div>
  );
};
