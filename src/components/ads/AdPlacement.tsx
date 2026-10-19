import React from 'react';
import { AdFormat } from '../../types/wallpaper';
import { Info } from 'lucide-react';

interface AdPlacementProps {
  format: AdFormat;
  slotId?: string;
  className?: string;
}

/**
 * Compliant Advertising Architecture Placeholder.
 * 
 * In production with an approved Google AdSense or programmatic web advertising account:
 * - Insert the script tag in index.html: <script async src="https://pagead2.googlesyndication.com/..."></script>
 * - Replace the container below with: <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-..." data-ad-slot={slotId} data-ad-format="auto" />
 * 
 * Note: Progressive Web Apps (PWAs) run standard Web Display ads (e.g. AdSense for Web),
 * NOT native Android AdMob SDKs, because PWAs are executed within browser runtimes.
 */
export const AdPlacement: React.FC<AdPlacementProps> = ({
  format,
  slotId = 'sample-web-slot',
  className = '',
}) => {
  return (
    <aside
      aria-label="Sponsored advertisement space"
      className={`my-6 flex flex-col items-center justify-center select-none ${className}`}
    >
      <div className="flex items-center gap-1 text-[10px] uppercase font-semibold text-zinc-600 dark:text-zinc-300 tracking-wider mb-1.5">
        <Info className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
        <span>Sponsor Area (Web Ad Unit)</span>
      </div>

      {format === 'banner' && (
        <>
          {/* Responsive Leaderboard for tablet & desktop (728x90) */}
          <div className="hidden sm:flex w-full max-w-[728px] h-[90px] rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-dashed border-zinc-300 dark:border-zinc-800 flex-col items-center justify-center p-3 text-center transition-colors">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              Web Display Placement (728×90 Leaderboard)
            </span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-0.5">
              Configured for Google AdSense / Display Network slot: {slotId}
            </span>
          </div>

          {/* Mobile Banner (320x50) */}
          <div className="flex sm:hidden w-full max-w-[320px] h-[50px] rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-dashed border-zinc-300 dark:border-zinc-800 flex-col items-center justify-center p-1.5 text-center">
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
              Mobile Display Unit (320×50)
            </span>
            <span className="text-[9px] text-zinc-600 dark:text-zinc-300">
              Slot: {slotId}
            </span>
          </div>
        </>
      )}

      {format === 'native-card' && (
        <div className="w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900/40 border border-dashed border-zinc-300 dark:border-zinc-800 p-4 text-center">
          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Compliant In-Feed Sponsor Slot
          </p>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-0.5">
            Placed safely outside wallpaper galleries to avoid accidental clicks.
          </p>
        </div>
      )}
    </aside>
  );
};
