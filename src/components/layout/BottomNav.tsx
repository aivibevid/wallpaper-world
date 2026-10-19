import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Grid, Search, Heart, Settings } from 'lucide-react';
import { NavigationTab } from '../../types/wallpaper';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Discover', icon: Home },
  { id: 'categories', label: 'Categories', icon: Grid },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'favorites', label: 'Saved', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, favorites } = useApp();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-xl border-t border-zinc-200/90 dark:border-zinc-800/90 pb-[env(safe-area-inset-bottom)] shadow-lg"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {item.id === 'favorites' && favorites.length > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
