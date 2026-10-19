import React from 'react';
import { useApp } from '../context/AppContext';
import { WallpaperCard } from '../components/wallpaper/WallpaperCard';
import { Heart, Compass, Sparkles, Trash2 } from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const { wallpapers, favorites, setActiveTab } = useApp();

  const favoriteWallpapers = wallpapers.filter((w) => favorites.includes(w.id));

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
            Saved Wallpapers
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            {favoriteWallpapers.length} wallpaper{favoriteWallpapers.length === 1 ? '' : 's'} stored offline in your device's browser memory.
          </p>
        </div>

        {favoriteWallpapers.length > 0 && (
          <button
            onClick={() => setActiveTab('home')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <Compass className="w-4 h-4" /> Discover more
          </button>
        )}
      </div>

      {favoriteWallpapers.length === 0 ? (
        <div className="py-24 text-center max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-200 dark:border-rose-900 shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1.5">
            Your collection is empty
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed mb-6">
            Tap the heart icon on any wallpaper thumbnail or preview page to save it for quick access anytime, even offline.
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs inline-flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Explore Wallpapers
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {favoriteWallpapers.map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      )}
    </div>
  );
};
