import { Sparkles, Gift, Heart, ShieldCheck } from 'lucide-react';
import Button from '../Button';
import { useCampaign } from '../../hooks/useCampaign';
import { useNavigate } from 'react-router-dom';

export default function BirthdayStorySection() {
  const { isActive, config } = useCampaign();
  const navigate = useNavigate();

  if (!isActive) return null;

  return (
    <section className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5FF] to-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#DFC5FE]/30 overflow-hidden">
      {/* Subtle celebratory background particles / gold glow */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#DFC5FE]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <Gift className="w-4 h-4 text-amber-600" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-800 uppercase">
            1ST ANNIVERSARY CELEBRATION
          </span>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {config.STORY_HEADLINE}
        </h2>

        <div className="space-y-4 max-w-2xl mx-auto text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
          <p className="font-serif italic text-gray-800 font-medium">
            &ldquo;{config.STORY_P1}&rdquo;
          </p>
          <p className="text-gray-600">
            {config.STORY_P2}
          </p>
        </div>

        {/* Pricing & Offer Card */}
        <div className="inline-block bg-white/90 backdrop-blur-md border border-[#DFC5FE] rounded-2xl p-6 sm:p-8 shadow-xl mb-8 transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <span className="text-gray-400 line-through text-xl sm:text-2xl font-medium">
              ₹{config.ORIGINAL_PRICE}
            </span>
            <span className="text-4xl sm:text-5xl font-bold font-serif text-[#6DBE45]">
              ₹{config.CAMPAIGN_PRICE}
            </span>
            <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-bold shadow-sm tracking-wide">
              {config.DISCOUNT_PERCENT}% OFF
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wider uppercase mb-6">
            Niacinamide 10% Face Serum (30ml) • Limited Anniversary Batch
          </p>

          <Button
            className="bg-[#6DBE45] hover:bg-[#5aa538] text-white px-8 py-3.5 rounded-full font-bold text-base shadow-md hover:shadow-xl transition-all"
            onClick={() => navigate('/products')}
          >
            {config.STORY_CTA}
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-gray-600 text-xs sm:text-sm font-medium">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#6DBE45]" />
            <span>Honest Formulations</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-[#6DBE45]" />
            <span>10,000+ Happy Skin Stories</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#6DBE45]" />
            <span>100% Dermatologically Tested</span>
          </div>
        </div>
      </div>
    </section>
  );
}
