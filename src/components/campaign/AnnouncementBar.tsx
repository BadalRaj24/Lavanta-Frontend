import { Sparkles } from 'lucide-react';
import { useCampaign } from '../../hooks/useCampaign';

interface AnnouncementBarProps {
  onOfferClick?: () => void;
}

export default function AnnouncementBar({ onOfferClick }: AnnouncementBarProps) {
  const { isActive, config } = useCampaign();

  if (!isActive) return null;

  return (
    <aside 
      aria-label="Birthday Promotion"
      className="bg-gradient-to-r from-[#2C4A26] via-[#6DBE45] to-[#2C4A26] text-white py-2 px-3 text-center relative z-50 overflow-hidden shadow-sm select-none cursor-pointer transition-all hover:brightness-105"
      onClick={onOfferClick}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse flex-shrink-0" />
        
        {/* Desktop copy */}
        <span className="hidden md:inline font-semibold">
          {config.ANNOUNCEMENT_DESKTOP}
        </span>

        {/* Mobile copy */}
        <span className="inline md:hidden font-semibold">
          {config.ANNOUNCEMENT_MOBILE}
        </span>

        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse flex-shrink-0" />
      </div>
    </aside>
  );
}
