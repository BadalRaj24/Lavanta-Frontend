import { useState, useEffect } from 'react';
import { Sparkles, Leaf, ShieldCheck, Heart, ChevronLeft, ChevronRight, Gift, Award } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../api';
import { useCampaign } from '../hooks/useCampaign';
import BirthdayCountdown from '../components/campaign/BirthdayCountdown';
import BirthdayStorySection from '../components/campaign/BirthdayStorySection';

export default function HomePage() {
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isActive: isBirthdayActive, config } = useCampaign();

  const heroImages = [
    "/face-serum.jpg",
    "/face-serum-2.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (Array.isArray(data) && data.length > 0) {
          const popular = data.filter((p: any) => p && p.isBestSeller).length > 0
            ? data.filter((p: any) => p && p.isBestSeller)
            : data;

          const formatted = popular.map((p: any) => ({
            ...p,
            id: p._id || p.id
          }));
          setBestSellers(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const testimonials = [
    {
      name: 'Vaishnavi Nayak',
      image: '/images/vaishnavi-nayak.jpg',
      review: 'The Niacinamide 10% Face Serum made a visible difference in just two weeks. My skin looks brighter, smoother, and more even'
    },
    {
      name: 'Faizan',
      image: '/images/rahul-mehta.jpg',
      review: 'I’ve been using this serum for a few weeks. It’s lightweight, absorbs quickly, and leaves my skin looking more even and smoother without irritation. Really happy with the results so far.'
    },
    {
      name: 'Yashika Singh',
      image: '/images/yashika-singh-final.jpg',
      review: 'Love the ingredients! My sensitive skin feels nourished and healthy. The night cream has quickly become my favorite.'
    }
  ];

  return (
    <div>
      {/* ============================================================ */}
      {/* HERO SECTION — CONDITIONAL (BIRTHDAY CAMPAIGN VS ORIGINAL) */}
      {/* ============================================================ */}
      {isBirthdayActive ? (
        <section className="relative bg-gradient-to-br from-[#FFFDF9] via-[#F8F2FF] to-[#EDFAF0] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#DFC5FE]/40">
          {/* Subtle champagne golden sparkles & glow decorations */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-8 left-12 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl animate-gentle-pulse"></div>
            <div className="absolute bottom-10 right-12 w-96 h-96 bg-[#DFC5FE]/40 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#6DBE45]/15 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Copy Hierarchy */}
            <div className="space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center space-x-2 bg-amber-100/80 border border-amber-300/70 px-4 py-1.5 rounded-full shadow-sm">
                <Gift className="w-4 h-4 text-amber-700" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-900 uppercase">
                  {config.EYEBROW}
                </span>
                <Sparkles className="w-4 h-4 text-amber-700" />
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                {config.HEADLINE}
              </h1>

              {/* Supporting Text */}
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                {config.SUBHEADLINE}
              </p>

              {/* Price & Offer Display */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#DFC5FE] p-5 sm:p-6 rounded-2xl shadow-lg max-w-lg">
                <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Niacinamide 10% Face Serum
                </div>

                <div className="flex items-baseline space-x-4 mb-2">
                  <span className="text-gray-400 line-through text-2xl font-semibold">
                    ₹{config.ORIGINAL_PRICE}
                  </span>
                  <span className="text-4xl sm:text-5xl font-bold font-serif text-[#6DBE45]">
                    ₹{config.CAMPAIGN_PRICE}
                  </span>
                  <span className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-bold shadow-sm">
                    {config.DISCOUNT_PERCENT}% OFF
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-amber-800 bg-amber-50/90 px-3 py-1.5 rounded-lg border border-amber-200/60 mt-3">
                  <span>{config.CAMPAIGN_LABEL}</span>
                </div>
              </div>

              {/* CTA & Optional Supporting Line */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-[#6DBE45] hover:bg-[#5aa538] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    onClick={() => navigate('/products')}
                  >
                    {config.CTA}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:border-[#6DBE45] px-6 py-4 rounded-xl font-semibold text-base"
                    onClick={() => navigate('/about')}
                  >
                    Our 1-Year Journey
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  {config.SUPPORTING_LINE}
                </p>
              </div>

              {/* Trust Features */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200/60">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-[#6DBE45]" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Clinically Formulated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-[#6DBE45]" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Dermatologically Tested</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#6DBE45]" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Toxin Free</span>
                </div>
              </div>
            </div>

            {/* Visual with Celebratory Botanical Accents */}
            <div className="relative group max-w-md mx-auto">
              {/* Soft celebratory glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 via-[#DFC5FE]/30 to-[#6DBE45]/25 rounded-3xl blur-2xl animate-gentle-pulse"></div>

              {/* Anniversary 1 Motif Badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-gradient-to-tr from-[#2C4A26] to-[#6DBE45] text-amber-200 border-2 border-amber-300/80 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform">
                <Award className="w-4 h-4 text-amber-300" />
                <span className="text-xs sm:text-sm font-black leading-none text-white">YEAR 1</span>
                <span className="text-[9px] sm:text-[10px] text-amber-200 font-bold uppercase">Special</span>
              </div>

              <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-square border-2 border-amber-100/60 bg-white/70 backdrop-blur-sm animate-soft-float">
                <img
                  src={heroImages[currentSlide]}
                  alt="Lavanta Naturals Niacinamide 10% Face Serum"
                  className="w-full h-full object-cover"
                />

                {/* Carousel Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-[#6DBE45]"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-[#6DBE45]"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-[#6DBE45] w-6' : 'bg-white/50 hover:bg-white'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Birthday Countdown */}
          <BirthdayCountdown />
        </section>
      ) : (
        /* ORIGINAL HERO SECTION */
        <section className="relative bg-gradient-to-r from-[#DFC5FE] to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#6DBE45] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#DFC5FE] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#6DBE45] leading-tight">
                Lavanta Naturals Where Skin Blooms
              </h1>
              <p className="text-xl text-gray-700">
                Crafted With Science Backed Formula - For All Skin Types
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => navigate('/products')}>Shop Now</Button>
                <Button variant="outline" onClick={() => navigate('/about')}>Our Story</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-6 h-6 text-[#6DBE45]" />
                  <span className="text-sm font-medium">Clinically Formulated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-[#6DBE45]" />
                  <span className="text-sm font-medium">Dermatologically Tested</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-[#6DBE45]" />
                  <span className="text-sm font-medium">Toxin Free</span>
                </div>
              </div>
            </div>
            <div className="relative group max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DFC5FE]/30 to-[#6DBE45]/20 rounded-3xl blur-2xl"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-square">
                <img
                  src={heroImages[currentSlide]}
                  alt="Lavanta Naturals Face Serum"
                  className="w-full h-full object-cover"
                />

                {/* Carousel Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-[#6DBE45]"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-[#6DBE45]"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-[#6DBE45] w-6' : 'bg-white/50 hover:bg-white'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Birthday Story Section (Only active during Campaign) */}
      <BirthdayStorySection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-[#6DBE45] mb-4">Our Best Sellers</h2>
          <p className="text-gray-600 text-lg">Discover our most loved skincare essentials</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id || product._id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
              tag={product.tag}
              onClick={() => navigate(`/product/${product.id || product._id}`)}
              onAddToCart={() => { }}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button onClick={() => navigate('/products')}>View All Products</Button>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#F8F8F8] to-[#DFC5FE]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[#6DBE45] mb-4">Why Choose Lavanta?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We believe in pure, natural, and sustainable skincare that works for everyone
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#DFC5FE] to-[#6DBE45] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">Ingredient Integrity</h3>
              <p className="text-gray-600">Carefully selected ingredients, free from harmful chemicals.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#DFC5FE] to-[#6DBE45] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">Cruelty-Free</h3>
              <p className="text-gray-600">Never tested on animals, always made with compassion</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-[#DFC5FE] to-[#6DBE45] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">Dermatologically Tested</h3>
              <p className="text-gray-600">Rigorously tested for safety and efficacy on all skin types</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-[#6DBE45] mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">Real results from real people</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-[#DFC5FE]/20 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="w-4 h-4 fill-[#6DBE45] text-[#6DBE45]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimonial.review}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
