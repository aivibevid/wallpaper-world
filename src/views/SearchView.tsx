import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { WallpaperCard } from '../components/wallpaper/WallpaperCard';
import { Search, X, SlidersHorizontal, ArrowUpDown, Tag } from 'lucide-react';
import { SortOption, CategoryId } from '../types/wallpaper';

export const SearchView: React.FC = () => {
  const { wallpapers, searchQuery, setSearchQuery, sortOption, setSortOption } = useApp();
  const [filterCategory, setFilterCategory] = useState<CategoryId | 'all'>('all');

  const query = searchQuery.trim().toLowerCase();

  // Popular search suggestion chips
  const popularTags = ['AMOLED', 'space', 'neon', 'dolomites', 'cyberpunk', 'mountains', 'supercar', 'sakura'];

  // Filter wallpapers by query & category
  const filtered = wallpapers.filter((w) => {
    // Category match
    if (filterCategory !== 'all' && w.category !== filterCategory) {
      return false;
    }
    // Search query match
    if (!query) return true;
    const inTitle = w.title.toLowerCase().includes(query);
    const inCategory = w.category.toLowerCase().includes(query);
    const inTags = w.tags.some((t) => t.toLowerCase().includes(query));
    const inAuthor = w.author.name.toLowerCase().includes(query);
    return inTitle || inCategory || inTags || inAuthor;
  });

  // Sort wallpapers
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'popular' || sortOption === 'trending') {
      return b.downloadsCount - a.downloadsCount;
    }
    if (sortOption === 'latest') {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    return 0;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search wallpapers by title, category, author or tags..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs sm:text-sm shadow-inner"
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Search Tag Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] text-zinc-400 shrink-0 font-medium mr-1 flex items-center gap-1">
          <Tag className="w-3 h-3" /> Quick:
        </span>
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchQuery(tag)}
            className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              query === tag.toLowerCase()
                ? 'bg-indigo-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
        {/* Category Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500 font-medium">Category:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          {(['trending', 'latest', 'popular'] as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setSortOption(opt)}
              className={`px-3 py-1 rounded-xl capitalize font-medium transition-colors ${
                sortOption === opt
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Clear Filter Action */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>
          Found <strong>{sorted.length}</strong> matching wallpaper{sorted.length === 1 ? '' : 's'}
        </span>
        {(searchQuery || filterCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('all');
            }}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Results Wallpaper Grid or Empty State */}
      {sorted.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
            No wallpapers matched your search
          </h2>
          <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
            We couldn't find any wallpapers matching "{searchQuery}". Try selecting "All Categories" or searching for keywords like "nature", "space", or "AMOLED".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('all');
            }}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-md"
          >
            Reset Search & Show All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {sorted.map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      )}
    </div>
  );
};
