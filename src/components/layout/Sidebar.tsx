import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Grid, Search, Heart, Settings, Sparkles, Moon } from 'lucide-react';
import { NavigationTab } from '../../types/wallpaper';
import { PWAInstallButton } from '../common/PWAInstallButton';

const SIDEBAR_ITEMS: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'home', label: 'Explore & Featured', icon: Home },
  { id: 'categories', label: 'All Categories (14)', icon: Grid },
  { id: 'search', label: 'Search & Filters', icon: Search },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, favorites, setSelectedCategory } = useApp();

  const handleAmoledShortcut = () => {
    setSelectedCategory('amoled');
    setActiveTab('categories');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-[#0c0c0e]/40 p-4 shrink-0 select-none">
      <div className="space-y-1 mb-6">
        <p className="px-3 text-[10px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">
          Discovery
        </p>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-1 mb-6">
        <p className="px-3 text-[10px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">
          Library
        </p>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
            activeTab === 'favorites'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4" />
            <span>Saved Favorites</span>
          </div>
          {favorites.length > 0 && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'favorites'
                  ? 'bg-indigo-900 text-indigo-100'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {favorites.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings & About</span>
        </button>
      </div>

      {/* PWA full install button in sidebar */}
      <div className="mb-4">
        <PWAInstallButton variant="full" />
      </div>

      {/* AMOLED Pro Tip Card */}
      <div 
        onClick={handleAmoledShortcut}
        className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 text-xs cursor-pointer group hover:border-indigo-500/40 transition-all"
      >
        <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 mb-1">
          <Moon className="w-3.5 h-3.5" />
          <span>AMOLED Battery Saver</span>
        </div>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          Explore pure #000000 true black wallpapers to turn off pixels and extend battery runtime on OLED displays.
        </p>
      </div>
    </aside>
  );
};
