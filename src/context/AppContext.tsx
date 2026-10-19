import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Wallpaper, CategoryId, NavigationTab, SortOption } from '../types/wallpaper';
import { WALLPAPERS } from '../data/wallpapers';

interface AppContextType {
  wallpapers: Wallpaper[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedCategory: CategoryId | null;
  setSelectedCategory: (cat: CategoryId | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  activeWallpaper: Wallpaper | null;
  setActiveWallpaper: (w: Wallpaper | null) => void;
  reloadWallpapers: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(WALLPAPERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ww_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTabState] = useState<NavigationTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('trending');
  const [activeWallpaper, setActiveWallpaperState] = useState<Wallpaper | null>(null);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ww_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Sync state with browser hash routing for natural back/forward navigation
  const syncWithHash = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    if (!rawHash) return;

    if (rawHash.startsWith('wallpaper/')) {
      const id = rawHash.replace('wallpaper/', '');
      const found = WALLPAPERS.find((w) => w.id === id);
      if (found) {
        setActiveWallpaperState(found);
      }
    } else {
      setActiveWallpaperState(null);
      const validTabs: NavigationTab[] = ['home', 'categories', 'search', 'favorites', 'settings'];
      if (validTabs.includes(rawHash as NavigationTab)) {
        setActiveTabState(rawHash as NavigationTab);
      }
    }
  }, []);

  useEffect(() => {
    syncWithHash();
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, [syncWithHash]);

  const setActiveTab = (tab: NavigationTab) => {
    setActiveTabState(tab);
    window.location.hash = `#/${tab}`;
    if (activeWallpaper) {
      setActiveWallpaperState(null);
    }
  };

  const setActiveWallpaper = (wallpaper: Wallpaper | null) => {
    setActiveWallpaperState(wallpaper);
    if (wallpaper) {
      window.location.hash = `#/wallpaper/${wallpaper.id}`;
    } else {
      window.location.hash = `#/${activeTab}`;
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const reloadWallpapers = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate refetch / shuffle
      setWallpapers([...WALLPAPERS]);
      setIsLoading(false);
    }, 450);
  };

  return (
    <AppContext.Provider
      value={{
        wallpapers,
        favorites,
        toggleFavorite,
        isFavorite,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        activeWallpaper,
        setActiveWallpaper,
        reloadWallpapers,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
