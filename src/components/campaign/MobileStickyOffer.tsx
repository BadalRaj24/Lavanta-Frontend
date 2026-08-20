import { useNavigate, useLocation } from 'react-router-dom';
import { useCampaign } from '../../hooks/useCampaign';

export default function MobileStickyOffer() {
  const { isActive, config } = useCampaign();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on checkout, cart, or admin pages to avoid blocking action buttons
  const isHiddenRoute = ['/checkout', '/cart', '/admin', '/order-success'].some(path =>
    location.pathname.startsWith(path)
  );

  if (!isActive || isHiddenRoute) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/80 shadow-2xl p-3 md:hidden transition-transform duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase">
              🎂 1ST BIRTHDAY
            </span>
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
              {config.DISCOUNT_PERCENT}% OFF
            </span>
          </div>
          <div className="flex items-baseline space-x-1.5 mt-0.5">
            <span className="text-gray-400 line-through text-xs font-medium">
              ₹{config.ORIGINAL_PRICE}
            </span>
            <span className="text-lg font-bold font-serif text-[#6DBE45]">
              ₹{config.CAMPAIGN_PRICE}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="bg-[#6DBE45] hover:bg-[#5da838] active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all tracking-wider uppercase flex-shrink-0"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
