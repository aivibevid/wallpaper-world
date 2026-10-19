import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Moon, Sun, Smartphone, Shield, Download, 
  Trash2, Info, Check, HelpCircle, HardDrive, Monitor, DollarSign
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isInstalled, isIOS, isInstallable, install } = usePWAInstall();
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleClearData = () => {
    if (window.confirm('Reset all saved favorites and preferences from your browser storage?')) {
      localStorage.clear();
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
          Settings & Information
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage appearance preferences, offline storage, and view app specifications.
        </p>
      </div>

      {/* Visual Theme Card */}
      <section className="p-4 sm:p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                Appearance & Theme
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {theme === 'dark'
                  ? 'Dark theme is active (#0c0c0e) to optimize OLED power efficiency.'
                  : 'Light theme is active.'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors active:scale-95"
          >
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>
      </section>

      {/* PWA & Home Screen Installation Guide */}
      <section className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center gap-2.5 text-zinc-900 dark:text-white font-bold text-sm">
          <Smartphone className="w-5 h-5 text-indigo-500" />
          Progressive Web App (PWA) Installation
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Wallpaper World is configured as a standalone Progressive Web App. When installed, it opens without browser address bars, caches wallpapers for offline viewing, and behaves like a native application.
        </p>

        {isInstallable && (
          <div className="pt-1">
            <button
              onClick={install}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
            >
              Install Wallpaper World to Home Screen
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-xs">
            <span className="font-semibold text-zinc-900 dark:text-white block mb-1">
              📱 Apple iOS (Safari):
            </span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Tap the <strong>Share</strong> button in Safari's bottom toolbar, scroll down and select <strong>"Add to Home Screen"</strong>.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-xs">
            <span className="font-semibold text-zinc-900 dark:text-white block mb-1">
              🤖 Google Android (Chrome):
            </span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Tap the <strong>⋮ (three dots)</strong> menu icon at top-right, then select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Monetization Architecture Disclosure */}
      <section className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center gap-2.5 text-zinc-900 dark:text-white font-bold text-sm">
          <DollarSign className="w-5 h-5 text-amber-500" />
          Monetization & Advertising Architecture
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <strong>Important Architecture Note:</strong> Progressive Web Apps (PWAs) run on open web standards inside browser rendering engines. Web advertising integrations (such as <em>Google AdSense for Web</em> or programmatic HTML5 display ad networks) are used for web apps, <strong>not Google AdMob</strong> (which is an SDK compiled into native Android Java/Kotlin APKs).
        </p>
        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <p className="font-semibold">Compliant Placement Policy:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Banner spaces are clearly labeled as "Sponsor Area" and physically isolated from wallpaper cards to prevent accidental clicks.</li>
            <li>No fake advertisements or artificial earnings counters are rendered.</li>
            <li>Users are never prompted, coerced, or rewarded for clicking ads.</li>
          </ul>
        </div>
      </section>

      {/* Privacy Policy Placeholder */}
      <section className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center gap-2.5 text-zinc-900 dark:text-white font-bold text-sm">
          <Shield className="w-5 h-5 text-emerald-500" />
          Privacy & Data Handling Notice
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Wallpaper World is completely functional without requiring user registration, accounts, or personal profiles.
        </p>
        <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 list-disc pl-5">
          <li><strong>No Personal Data Harvested:</strong> Your favorites, history, and theme preferences are stored exclusively on your device via HTML5 <code>localStorage</code>.</li>
          <li><strong>Zero Background Tracking:</strong> No cross-site tracking cookies or intrusive tracking pixels are utilized.</li>
          <li><strong>Pre-Launch Checklist:</strong> Before deploying to a custom custom commercial domain, ensure your company's full legal entity name and contact email are linked in your production privacy statement.</li>
        </ul>
      </section>

      {/* Device & Storage Diagnostics */}
      <section className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center gap-2.5 text-zinc-900 dark:text-white font-bold text-sm">
          <HardDrive className="w-5 h-5 text-indigo-500" />
          Device Storage & Diagnostics
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">App Version</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">v1.0.0 (Production)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Display Mode</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
              {isInstalled ? 'Standalone PWA' : 'Browser Viewport'}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Screen Viewport</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
              {typeof window !== 'undefined' ? `${window.innerWidth} × ${window.innerHeight}` : 'Mobile'}
            </span>
          </div>
        </div>

        {/* Clear Storage */}
        <div className="pt-2 flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            Clear locally saved favorites and cached themes:
          </p>
          <button
            onClick={handleClearData}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {resetSuccess ? 'Reset Complete!' : 'Reset Local Data'}
          </button>
        </div>
      </section>
    </div>
  );
};
