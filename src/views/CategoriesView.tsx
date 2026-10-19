import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { WallpaperCard } from '../components/wallpaper/WallpaperCard';
import { CategoryId } from '../types/wallpaper';
import { Layers, ArrowLeft, Filter, Sparkles } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { wallpapers, selectedCategory, setSelectedCategory } = useApp();

  const filteredWallpapers = selectedCategory
    ? wallpapers.filter((w) => w.category === selectedCategory)
    : wallpapers;

  const activeCategoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-8 pb-20">
      {/* Category Pills Header Bar for Quick Switching */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all snap-start ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          All (14 Categories)
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all snap-start ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Selected Category Hero / Header */}
      {selectedCategory && activeCategoryInfo ? (
        <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 bg-zinc-900 text-white shadow-xl">
          <img
            src={activeCategoryInfo.coverImage}
            alt={activeCategoryInfo.name}
            className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

          <div className="relative z-10 max-w-xl">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 mb-2.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all categories
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {activeCategoryInfo.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
              {activeCategoryInfo.description}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{filteredWallpapers.length} Wallpapers in this category</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Wallpaper Categories
            </h1>
          </div>
          <p className="text-xs text-zinc-500 mb-6">
            Explore 14 curated aesthetics tailored for mobile screens, lockscreens, and desktops.
          </p>

          {/* 14 Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {CATEGORIES.map((cat) => {
              const count = wallpapers.filter((w) => w.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-28 sm:h-32 group text-left border border-zinc-200/80 dark:border-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <img
                    src={cat.coverImage}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors flex flex-col justify-end p-3 sm:p-4 text-white">
                    <span className="font-bold text-xs sm:text-sm leading-tight">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-zinc-300 mt-0.5">
                      {count} wallpapers
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Wallpapers Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
            {selectedCategory ? `${activeCategoryInfo?.name} Wallpapers` : 'All Curated Wallpapers'}
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            {filteredWallpapers.length} backdrops
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredWallpapers.map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      </div>
    </div>
  );
};
