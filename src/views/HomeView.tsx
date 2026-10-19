import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { WallpaperCard } from '../components/wallpaper/WallpaperCard';
import { AdPlacement } from '../components/ads/AdPlacement';
import { Sparkles, Flame, Clock, ArrowRight, Search, Zap, Layers } from 'lucide-react';
import { CategoryId } from '../types/wallpaper';

export const HomeView: React.FC = () => {
  const { 
    wallpapers, 
    setActiveTab, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    isLoading 
  } = useApp();

  const featured = wallpapers.filter((w) => w.featured);
  const trending = [...wallpapers].sort((a, b) => b.downloadsCount - a.downloadsCount).slice(0, 8);
  const recentlyAdded = [...wallpapers].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ).slice(0, 8);

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab('categories');
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('search');
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-20">
      {/* Mobile Search Bar (only visible on small screens where header search is hidden) */}
      <div className="md:hidden">
        <form onSubmit={handleMobileSearch} className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wallpapers, tags, 4K..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </form>
      </div>

      {/* Featured Wallpapers */}
      <section>
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-amber-500/10 text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Featured 4K Backdrops
              </h2>
              <p className="text-[11px] text-zinc-500 hidden sm:block">
                Hand-picked ultra resolution wallpapers with high aesthetic clarity
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Explore all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {featured.slice(0, 4).map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      </section>

      {/* Curated Categories Horizontal Scroller */}
      <section>
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Popular Collections
              </h2>
              <p className="text-[11px] text-zinc-500 hidden sm:block">
                Choose from 14 distinct visual genres
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('categories')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            View all 14 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="relative shrink-0 w-32 sm:w-40 h-24 sm:h-28 rounded-2xl overflow-hidden cursor-pointer group shadow-sm snap-start text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <img
                src={cat.coverImage}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors flex flex-col justify-end p-2.5 sm:p-3">
                <span className="text-xs font-bold text-white tracking-tight drop-shadow">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Compliant Ad Placement Leaderboard */}
      <AdPlacement format="banner" slotId="home-feed-banner" />

      {/* Trending Wallpapers */}
      <section>
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-rose-500/10 text-rose-500">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Trending This Week
              </h2>
              <p className="text-[11px] text-zinc-500 hidden sm:block">
                Most downloaded wallpapers by mobile and desktop users
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {trending.map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      </section>

      {/* Recently Added Wallpapers */}
      <section>
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-500">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Recently Added
              </h2>
              <p className="text-[11px] text-zinc-500 hidden sm:block">
                Fresh drops in our curated wallpaper vault
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {recentlyAdded.map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      </section>
    </div>
  );
};
