import { Star } from 'lucide-react';

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
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-transparent hover:border-[#DFC5FE]"
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F8F8F8] to-[#DFC5FE]/20 p-6 h-64">
        {tag && (
          <span className="absolute top-4 right-4 bg-[#6DBE45] text-white text-xs px-3 py-1 rounded-full font-medium shadow-md z-10">
            {tag}
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
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#6DBE45]">₹{price}</span>
          <div></div>
        </div>
      </div>
    </div>
  );
}
