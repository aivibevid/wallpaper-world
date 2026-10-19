import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { Sun, Moon, Search, RefreshCw, Smartphone, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery, setActiveTab, reloadWallpapers, isLoading } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('search');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-[#0c0c0e]/85 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group select-none focus:outline-none"
          aria-label="Wallpaper World Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-[2px] shadow-sm group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white">
                Wallpaper World
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium hidden sm:block">
              Ultra HD 4K & AMOLED Curations
            </p>
          </div>
        </button>

        {/* Desktop Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
          <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 4K, AMOLED, cars, anime, nature..."
            className="w-full pl-10 pr-12 py-2 text-xs sm:text-sm rounded-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium"
            >
              Clear
            </button>
          )}
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          <PWAInstallButton variant="compact" />

          {/* Refresh Wallpaper Feed */}
          <button
            onClick={reloadWallpapers}
            title="Refresh wallpaper feed"
            aria-label="Refresh wallpapers"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 active:scale-95 transition-all"
          >
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isLoading ? 'animate-spin text-indigo-500' : ''}`} />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 active:scale-95 transition-all"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
