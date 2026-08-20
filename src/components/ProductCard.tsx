import { Star, Sparkles } from 'lucide-react';
import { useCampaign } from '../hooks/useCampaign';

interface ProductCardProps {
  name: string;
  price: number;
  rating: number;
  image: string;
  tag?: string;
  onAddToCart?: () => void;
  onClick?: () => void;
}

export default function ProductCard({ name, price, rating, image, tag, onAddToCart, onClick }: ProductCardProps) {
  const { isActive: isBirthdayActive, config } = useCampaign();

  // If campaign is active, serum gets the birthday special treatment
  const displayPrice = isBirthdayActive ? config.CAMPAIGN_PRICE : price;
  const originalPrice = config.ORIGINAL_PRICE;
  const displayTag = isBirthdayActive ? config.BADGE : tag;

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border ${
        isBirthdayActive ? 'border-amber-200/80 hover:border-[#6DBE45]' : 'border-transparent hover:border-[#DFC5FE]'
      }`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F8F8F8] to-[#DFC5FE]/20 p-6 h-64">
        {displayTag && (
          <span className={`absolute top-4 right-4 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md z-10 flex items-center space-x-1 ${
            isBirthdayActive ? 'bg-gradient-to-r from-amber-600 to-[#6DBE45]' : 'bg-[#6DBE45]'
          }`}>
            {isBirthdayActive && <Sparkles className="w-3 h-3 text-amber-200 mr-1 fill-amber-200" />}
            <span>{displayTag}</span>
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
        
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-[#6DBE45] text-[#6DBE45]' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline space-x-2">
            {isBirthdayActive && (
              <span className="text-sm font-medium text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold font-serif text-[#6DBE45]">
              ₹{displayPrice}
            </span>
            {isBirthdayActive && (
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                {config.DISCOUNT_PERCENT}% OFF
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
            className="text-xs font-bold text-[#6DBE45] hover:text-[#5aa538] uppercase tracking-wider py-1.5 px-3 rounded hover:bg-green-50 transition-colors"
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}
