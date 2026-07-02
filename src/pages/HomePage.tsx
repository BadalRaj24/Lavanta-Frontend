import { useState, useEffect } from 'react';
import { Sparkles, Leaf, ShieldCheck, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';


import ProductCard from '../components/ProductCard';
import api from '../api';

export default function HomePage() {
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
        // Determine best sellers logic, or just take first 6 for now
        // If data has 'isBestSeller' flag use that, else slice
        const popular = data.filter((p: any) => p.isBestSeller).length > 0
          ? data.filter((p: any) => p.isBestSeller)
          : data.slice(0, 6);

        // Map _id to id for component compatibility if needed
        const formatted = popular.map((p: any) => ({
          ...p,
          id: p._id
        }));
        setBestSellers(formatted);
      } catch (error) {
        console.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const testimonials = [
    {
      name: 'Vaishnavi Nayak',
      image: '/images/vaishnavi-nayak.jpg',
      review: 'The Glow Face Serum made a visible difference in just two weeks. My skin looks brighter, smoother, and more even'
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-[#6DBE45] mb-4">Our Best Sellers</h2>
          <p className="text-gray-600 text-lg">Discover our most loved skincare essentials</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => navigate(`/product/${product.id}`)}
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
