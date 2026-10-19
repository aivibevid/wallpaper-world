import React, { useState } from 'react';
import { Wallpaper } from '../../types/wallpaper';
import { useApp } from '../../context/AppContext';
import { Heart, Download, Maximize2, AlertCircle, RefreshCw } from 'lucide-react';
import { downloadWallpaper } from '../../utils/downloadHelper';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
}

export const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper }) => {
  const { isFavorite, toggleFavorite, setActiveWallpaper } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const favorited = isFavorite(wallpaper.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(wallpaper.id);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    await downloadWallpaper(wallpaper.imageUrl, wallpaper.title);
    setDownloading(false);
  };

  const handleRetryImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setImageLoaded(false);
  };

  return (
    <div
      onClick={() => setActiveWallpaper(wallpaper)}
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end"
      style={{ aspectRatio: '9 / 16' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveWallpaper(wallpaper);
        }
      }}
      aria-label={`View wallpaper: ${wallpaper.title}`}
    >
      {/* Skeleton Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800/70 animate-pulse flex flex-col items-center justify-center p-4 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-2" />
          <span className="text-[11px] text-zinc-400 font-medium">Loading 4K image...</span>
        </div>
      )}

      {/* Error Fallback State */}
      {imageError && (
        <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="w-7 h-7 text-rose-500 mb-2" />
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Image failed to load
          </span>
          <p className="text-[10px] text-zinc-400 mt-1 mb-3">
            Network issue or cross-origin block
          </p>
          <button
            onClick={handleRetryImage}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-[11px] font-medium flex items-center gap-1.5 hover:bg-indigo-700 active:scale-95 transition"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        </div>
      )}

      {/* Thumbnail Image */}
      {!imageError && (
        <img
          src={wallpaper.thumbnailUrl}
          alt={wallpaper.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Top Floating Badge & Favorite Button */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider shadow-sm">
          {wallpaper.category}
        </span>
        <button
          onClick={handleFavorite}
          aria-label={favorited ? `Remove ${wallpaper.title} from favorites` : `Add ${wallpaper.title} to favorites`}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md border transition-transform active:scale-90 shadow-sm ${
            favorited
              ? 'bg-rose-500 text-white border-rose-400'
              : 'bg-black/50 text-white/90 border-white/15 hover:bg-black/75'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Bottom Information & Action Strip */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3 sm:p-3.5 pt-12 text-white flex flex-col justify-end z-10 pointer-events-none">
        <h3 className="font-semibold text-xs sm:text-sm line-clamp-1 drop-shadow-sm group-hover:text-indigo-300 transition-colors">
          {wallpaper.title}
        </h3>
        
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-300 mt-1 pointer-events-auto">
          <span className="truncate max-w-[100px] sm:max-w-[130px] opacity-90">
            {wallpaper.author.name}
          </span>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={handleDownload}
              disabled={downloading}
              aria-label={`Download ${wallpaper.title}`}
              title="Download Ultra HD"
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md active:scale-90 transition-transform disabled:opacity-50"
            >
              <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveWallpaper(wallpaper);
              }}
              aria-label={`Preview ${wallpaper.title}`}
              title="Preview on phone mockup"
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md active:scale-90 transition-transform"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
