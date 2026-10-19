import React, { useState, useEffect } from 'react';
import { Wallpaper } from '../../types/wallpaper';
import { useApp } from '../../context/AppContext';
import { 
  X, Heart, Download, Share2, ShieldCheck, 
  Smartphone, ExternalLink, Check, AlertCircle, Eye, 
  Layers, Info, ArrowLeft, Copy
} from 'lucide-react';
import { downloadWallpaper } from '../../utils/downloadHelper';

interface Props {
  wallpaper: Wallpaper;
  onClose: () => void;
}

export const WallpaperDetailModal: React.FC<Props> = ({ wallpaper, onClose }) => {
  const { isFavorite, toggleFavorite } = useApp();
  const [downloading, setDownloading] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [showPhoneFrame, setShowPhoneFrame] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const favorited = isFavorite(wallpaper.id);

  // Live clock for Phone Simulator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleDownload = async () => {
    setDownloading(true);
    setFeedback({ text: 'Starting high-resolution download...', type: 'info' });
    const res = await downloadWallpaper(wallpaper.imageUrl, wallpaper.title);
    setDownloading(false);
    setFeedback({
      text: res.message,
      type: res.method === 'blob' ? 'success' : 'info',
    });
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${wallpaper.title} — Wallpaper World`,
      text: `Check out this 4K ${wallpaper.category} wallpaper on Wallpaper World!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setFeedback({ text: 'Shared successfully!', type: 'success' });
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setFeedback({ text: 'Wallpaper link copied to clipboard!', type: 'success' });
      } catch {
        setFeedback({ text: `Share link: ${shareUrl}`, type: 'info' });
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={wallpaper.title}
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#151518] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Mobile Back Button */}
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-all active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Large Image Preview / Live Phone Mockup Simulator */}
        <div className="relative md:w-1/2 bg-[#09090b] flex items-center justify-center p-4 min-h-[380px] md:min-h-[580px] overflow-hidden select-none">
          {/* Subtle ambient blur behind */}
          <div 
            className="absolute inset-0 opacity-25 filter blur-3xl scale-125 pointer-events-none"
            style={{
              backgroundImage: `url(${wallpaper.thumbnailUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {showPhoneFrame ? (
            /* Live Phone Mockup Frame */
            <div className="relative z-10 w-64 h-[470px] rounded-[42px] border-[6px] border-zinc-800 bg-black shadow-2xl overflow-hidden flex flex-col justify-between text-white animate-fadeIn">
              <img
                src={wallpaper.imageUrl}
                alt={wallpaper.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

              {/* Dynamic Island / Notch */}
              <div className="relative z-10 mx-auto mt-2.5 w-24 h-5 bg-black rounded-full flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700" />
              </div>

              {/* Lockscreen Clock */}
              <div className="relative z-10 text-center mt-6">
                <span className="text-[11px] font-medium uppercase tracking-widest text-white/90 drop-shadow">
                  {currentDate}
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight drop-shadow-lg text-white mt-0.5">
                  {currentTime}
                </h2>
              </div>

              {/* Phone Bottom Dock Icons Simulation */}
              <div className="relative z-10 p-3 bg-white/15 backdrop-blur-lg mx-3 mb-4 rounded-3xl flex justify-around border border-white/10 shadow-lg">
                <div className="w-8 h-8 rounded-2xl bg-emerald-500/90 flex items-center justify-center text-[10px] font-bold shadow">
                  📞
                </div>
                <div className="w-8 h-8 rounded-2xl bg-sky-500/90 flex items-center justify-center text-[10px] font-bold shadow">
                  💬
                </div>
                <div className="w-8 h-8 rounded-2xl bg-amber-500/90 flex items-center justify-center text-[10px] font-bold shadow">
                  📷
                </div>
                <div className="w-8 h-8 rounded-2xl bg-indigo-500/90 flex items-center justify-center text-[10px] font-bold shadow">
                  🎵
                </div>
              </div>

              {/* iOS / Android home bar */}
              <div className="relative z-10 mx-auto mb-2 w-28 h-1 bg-white/70 rounded-full" />
            </div>
          ) : (
            /* Standard Full-Resolution Preview */
            <div className="relative z-10 flex items-center justify-center w-full h-full max-h-[520px]">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2" />
                  Loading original 4K photo...
                </div>
              )}
              <img
                src={wallpaper.imageUrl}
                alt={wallpaper.title}
                onLoad={() => setImageLoaded(true)}
                className={`max-h-[500px] w-auto max-w-full rounded-2xl object-contain shadow-2xl transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}

          {/* Toggle Simulator Button */}
          <button
            onClick={() => setShowPhoneFrame(!showPhoneFrame)}
            className="absolute bottom-4 left-4 z-20 text-xs px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95 border border-white/10 font-medium"
          >
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            {showPhoneFrame ? 'Standard Image View' : 'Preview on Phone Lockscreen'}
          </button>
        </div>

        {/* Right Side: Details, Attribution, Actions, Device Guide */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            {/* Category & Resolution Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 uppercase tracking-wider">
                {wallpaper.category}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {wallpaper.width} × {wallpaper.height} PX (Ultra HD)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3 leading-snug">
              {wallpaper.title}
            </h1>

            {/* Author Attribution & License Box */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span>Photographer / Creator:</span>
                <a
                  href={wallpaper.author.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  {wallpaper.author.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>License:</span>
                <a
                  href={wallpaper.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1 hover:underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  {wallpaper.license}
                </a>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[11px] text-zinc-400">
                <span>Downloads: {wallpaper.downloadsCount.toLocaleString()}</span>
                <span>Views: {wallpaper.viewsCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {wallpaper.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Honest instructions for setting as wallpaper */}
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs text-blue-950 dark:text-blue-200 leading-relaxed mb-4">
              <div className="font-semibold flex items-center gap-1.5 mb-1 text-blue-800 dark:text-blue-300">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                How to set as your wallpaper:
              </div>
              <p className="text-[11px] text-blue-900/80 dark:text-blue-300/80 mb-1.5">
                Web browsers do not have system permission to directly modify your home screen. Follow these standard steps:
              </p>
              <ul className="text-[11px] list-disc pl-4 space-y-1">
                <li>Tap <strong>Download Ultra HD</strong> to save the original high-resolution picture to your device.</li>
                <li><strong>iPhone:</strong> Open Photos &gt; Share &gt; <em>Use as Wallpaper</em>.</li>
                <li><strong>Android:</strong> Open Google Photos &gt; Three Dots &gt; <em>Use as &gt; Wallpaper</em> (or via Settings &gt; Wallpaper).</li>
              </ul>
            </div>

            {/* Notification Toast */}
            {feedback && (
              <div
                className={`p-3 rounded-2xl text-xs mb-3 flex items-start gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feedback.text}</span>
              </div>
            )}
          </div>

          {/* Action Button Row */}
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
            >
              <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
              {downloading ? 'Saving Image...' : 'Download Ultra HD (Free)'}
            </button>

            <button
              onClick={() => toggleFavorite(wallpaper.id)}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-3 rounded-2xl border transition-all active:scale-95 ${
                favorited
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-500'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title={favorited ? 'Saved in favorites' : 'Save to favorites'}
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              aria-label="Share wallpaper"
              className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
              title="Share wallpaper link"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
