import { useState, useEffect } from 'react';
import { Star, Leaf, ShieldCheck, Heart, Sparkles, ChevronLeft, CheckCircle } from 'lucide-react';

import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  tag?: string;
  skinType?: string[];
  description?: string;
  // Extended fields
  volume?: string;
  benefits?: string[];
  ingredients?: string;
  usage?: { step: number; title: string; instruction: string; image: string }[];
  faqs?: { question: string; answer: string }[];
  reviews?: number;
  images?: string[];
}

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [volume, setVolume] = useState('30ml');
  const [loading, setLoading] = useState(true);

  // Review specific state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);





  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const fetchProduct = async () => {
    try {
      if (!productId) return;
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      if (!productId) return;
      const { data } = await api.get(`/reviews/product/${productId}`);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchReviews();
    }
  }, [productId]);

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      addToast('error', 'Please select a rating');
      return;
    }
    if (!reviewComment.trim()) {
      addToast('error', 'Please write a comment');
      return;
    }

    try {
      await api.post('/reviews', {
        productId,
        rating: userRating,
        comment: reviewComment
      });
      addToast('success', 'Review submitted successfully!');
      setShowReviewForm(false);
      setReviewComment('');
      setUserRating(0);
      fetchReviews(); // Refresh review list
    } catch (error: any) {
      addToast('error', error.response?.data?.message || 'Error submitting review');
    }
  };

  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6DBE45]"></div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Defaults for missing data
  const fetchedImages = product.images && product.images.length > 0 ? product.images : [product.image, product.image, product.image];
  const baseImages = fetchedImages.filter(img => typeof img === 'string' && !img.includes('niacinamide-face-serum-2.jpg') && !img.includes('niacinamide-face-serum.jpg'));
  const images = [
    ...baseImages, 
    '/images/Screenshot_20260410_233203.jpg', 
    '/images/IMG_0892.PNG',
    '/images/IMG_0888.PNG',
    '/images/IMG_0889.PNG',
    '/images/IMG_0891.PNG'
  ];
  const benefits = product.benefits || [];
  const reviewCount = reviews.length; // Use real review count



  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] relative overflow-x-hidden w-full">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0 relative z-10">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center space-x-2 text-[#6DBE45] hover:text-[#5ca63a] transition-colors mb-8 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="min-w-0 w-full">
            <div className="relative bg-[#F5F5F5] rounded-3xl p-4 sm:p-8 mb-4 flex justify-center items-center overflow-hidden border border-gray-100 shadow-sm w-full">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-64 md:h-96 object-contain relative z-10"
              />
            </div>
            <div className="flex space-x-4 overflow-x-auto py-3 px-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === idx ? 'border-[#6DBE45] scale-105 shadow-md' : 'border-gray-200 hover:border-[#6DBE45]/50'
                    }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 w-full">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-[#6DBE45] text-white text-xs px-3 py-1 rounded-full font-medium flex items-center shadow-sm">
                <Sparkles className="w-3 h-3 mr-1 fill-white" /> Bestseller
              </span>
              <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium border border-green-100">In Stock</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight break-words">{product.name}</h1>
            <div className="inline-block bg-gray-100 px-3 py-1 rounded-lg border border-gray-200 mb-4 text-sm shadow-sm">
              <span className="font-semibold text-gray-700">Suitable For:</span> <span className="text-[#6DBE45] font-bold">All skin types</span>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-[#6DBE45] text-[#6DBE45]' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-3 text-gray-600">({reviewCount} reviews)</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-[#6DBE45]">₹{product.price}</span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed break-words">{product.description}</p>


            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-pink-100 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Key Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-[#6DBE45] mt-1 flex-shrink-0 fill-green-100" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <span className="text-gray-700 font-medium">Select Volume:</span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${volume === '30ml'
                    ? 'border-[#6DBE45] bg-green-50 text-[#6DBE45]'
                    : 'border-gray-200 text-gray-600 hover:border-[#6DBE45]/50'
                    }`}
                  onClick={() => setVolume('30ml')}
                >
                  30ml
                </button>
                <div className="relative">
                  <button
                    disabled
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-300 bg-transparent cursor-not-allowed font-medium"
                  >
                    15ml
                  </button>
                  <span className="absolute -top-2.5 -right-3 bg-gray-900 text-white text-[9px] px-2 py-0.5 rounded font-medium shadow-sm transition-opacity opacity-90">
                    SOON
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#6DBE45] font-bold text-xl hover:scale-110 transition-transform"
                  >
                    -
                  </button>
                  <span className="font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#6DBE45] font-bold text-xl hover:scale-110 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <Button
                className="flex-1 bg-[#6DBE45] hover:bg-[#5ca63a] text-white shadow-lg transform hover:-translate-y-1 transition-all border-none"
                onClick={() => addToCart(product, quantity)}
              >
                <div className="flex items-center justify-center w-full text-lg">
                  Add to Cart
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 border-[#6DBE45] text-[#6DBE45] text-lg"
                onClick={() => {
                  addToCart(product, quantity);
                  navigate('/checkout');
                }}
              >
                Buy Now
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-[#6DBE45]" />
                <span className="text-gray-700">Clinically Formulated</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#6DBE45]" />
                <span className="text-gray-700">Dermatologically Tested</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-[#6DBE45]" />
                <span className="text-gray-700">Science Backed</span>
              </div>
            </div>
          </div>
        </div>


        {/* Ingredients Section (Highlighted) */}
        <div className="bg-gradient-to-br from-green-50 via-white to-green-50 rounded-2xl p-8 shadow-md border border-green-100 mb-12 relative overflow-hidden">
          <h2 className="font-serif text-2xl font-bold text-[#6DBE45] mb-4 flex items-center relative z-10">
            <Leaf className="w-6 h-6 mr-2" /> Ingredients
          </h2>
          <p className="text-gray-800 leading-relaxed font-medium relative z-10 break-words">{product.ingredients || 'Natural Ingredients'}</p>
        </div>


        {/* Rich Usage Section */}
        {product.usage && Array.isArray(product.usage) && product.usage.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
            <h2 className="font-serif text-2xl font-bold text-[#6DBE45] mb-8 text-center flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2" /> How to Use
            </h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector Line (Desktop only) */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-green-100 z-0 transform -translate-y-1/2"></div>

              {product.usage.map((step: any, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#6DBE45] text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-lg border-4 border-white transform hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm max-w-xs">{step.instruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}



        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-16">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <h2 className="font-serif text-2xl font-bold text-gray-900">Ratings & Reviews</h2>
              <div className="flex items-center gap-1 text-sky-500 font-medium text-sm">
                <ShieldCheck className="w-4 h-4 fill-sky-500 text-white" />
                Only verified users
              </div>
            </div>

            {user ? (
              !showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-6 py-2 border-2 border-sky-400 text-sky-500 font-bold text-sm rounded uppercase tracking-wider hover:bg-sky-50 transition-colors"
                >
                  Rate Product
                </button>
              )
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 border-2 border-sky-400 text-sky-500 font-bold text-sm rounded uppercase tracking-wider hover:bg-sky-50 transition-colors"
              >
                Rate Product
              </button>
            )}
          </div>

          {/* Ratings Summary Section */}
          <div className="mb-12 border-b border-gray-100 pb-10">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-gray-900">{product.rating.toFixed(1)}</span>
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-gray-500 text-sm ml-2">Based on {reviewCount} Reviews</span>
            </div>

            <div className="space-y-4 max-w-2xl">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => Math.round(r.rating) === star).length;
                const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-4 text-sm">
                    <span className="w-6 flex items-center font-medium text-gray-700">{star} <span className="ml-1 text-gray-400">★</span></span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="w-10 text-right text-gray-500">({count})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List and Form */}
          <div className="w-full">
            {showReviewForm && (
              <div className="bg-gray-50 p-6 rounded-xl mb-10 animate-fadeIn border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">Write your review</h3>
                  <button onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-gray-600">Cancel</button>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition-colors mr-1 ${(hoverRating || userRating) >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                        }`}
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  rows={4}
                  placeholder="Tell us what you think..."
                ></textarea>
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitReview}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-8"
                  >
                    SUBMIT
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {reviews.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No reviews yet. Be the first to share your thoughts!</div>
              ) : (
                reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-lg ${['bg-blue-600', 'bg-yellow-500', 'bg-purple-600', 'bg-pink-500', 'bg-green-500'][idx % 5]
                          }`}>
                          {review.user?.name ? review.user.name.charAt(0).toUpperCase() : 'A'}{review.user?.name && review.user.name.split(' ')[1] ? review.user.name.split(' ')[1].charAt(0).toUpperCase() : ''}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 leading-tight">
                            {review.user?.name || 'Anonymous User'}
                          </h4>
                          <div className="text-sm text-green-600 font-medium mt-0.5">
                            Verified User
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                      ))}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-sm">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span className="text-[#6DBE45] font-bold text-xl">{openFaqIndex === idx ? '−' : '+'}</span>
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-gray-600 text-sm bg-gray-50 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Shop With Us (Filler Section) */}
        <div className="grid md:grid-cols-3 gap-6 border-t border-gray-100 pt-12 pb-12">
          <div className="text-center p-6 bg-white/50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6DBE45]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On all orders above ₹499</p>
          </div>
          <div className="text-center p-6 bg-white/50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6DBE45]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Easy Returns</h3>
            <p className="text-gray-600 text-sm">7-day hassle-free returns</p>
          </div>
          <div className="text-center p-6 bg-white/50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6DBE45]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">100% secure checkout</p>
          </div>
        </div>

      </div>
    </div>
  );
}
