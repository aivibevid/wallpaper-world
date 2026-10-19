import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './views/HomeView';
import { CategoriesView } from './views/CategoriesView';
import { SearchView } from './views/SearchView';
import { FavoritesView } from './views/FavoritesView';
import { SettingsView } from './views/SettingsView';
import { WallpaperDetailModal } from './components/wallpaper/WallpaperDetailModal';
import { OfflineIndicator } from './components/common/OfflineIndicator';

export default function App() {
  const { activeTab, activeWallpaper, setActiveWallpaper } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'categories':
        return <CategoriesView />;
      case 'search':
        return <SearchView />;
      case 'favorites':
        return <FavoritesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0e] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Body Container with Desktop Sidebar and Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden min-w-0">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Interactive Detail Modal with Device Mockup */}
      {activeWallpaper && (
        <WallpaperDetailModal
          wallpaper={activeWallpaper}
          onClose={() => setActiveWallpaper(null)}
        />
      )}

      {/* Offline Status Badge */}
      <OfflineIndicator />
    </div>
  );
}
