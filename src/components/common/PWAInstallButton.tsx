import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { DownloadCloud, Smartphone, X, Share2, PlusSquare } from 'lucide-react';

interface Props {
  variant?: 'compact' | 'full';
  className?: string;
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'compact', className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running in standalone mode (already installed), hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-xs shadow-sm transition-all ${
          variant === 'full' ? 'w-full justify-center py-2.5 px-4' : 'py-1.5 px-3'
        } ${className}`}
        title="Install Wallpaper World as an app"
      >
        <DownloadCloud className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-medium transition-colors ${
            variant === 'full' ? 'w-full justify-center py-2.5 px-4' : 'py-1.5 px-2.5'
          } ${className}`}
          title="Install on iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
          <span>Install PWA</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                Install on iOS Safari
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                Add Wallpaper World to your iPhone or iPad home screen for full-screen browsing and instant access.
              </p>

              <div className="space-y-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="flex-1 flex items-center gap-1.5">
                    Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 text-indigo-500 inline" /> in Safari's bottom toolbar.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="flex-1 flex items-center gap-1.5">
                    Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 text-indigo-500 inline" />.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
