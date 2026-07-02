import { useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../api';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  tag: string;
  skinType: string[];
}

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkinType, setSelectedSkinType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const skinTypes = ['All Skin Types', 'Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];

  const handleSkinTypeToggle = (type: string) => {
    const value = type.toLowerCase().replace(' skin types', 'all').replace(' ', '');
    if (selectedSkinType.includes(value)) {
      setSelectedSkinType(selectedSkinType.filter(t => t !== value));
    } else {
      setSelectedSkinType([...selectedSkinType, value]);
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedSkinType.length > 0) {
      const hasMatchingSkinType = product.skinType.some(type => selectedSkinType.includes(type));
      if (!hasMatchingSkinType) return false;
    }

    if (priceRange !== 'all') {
      if (priceRange === 'under500' && product.price >= 500) return false;
      if (priceRange === '500to700' && (product.price < 500 || product.price > 700)) return false;
      if (priceRange === 'above700' && product.price <= 700) return false;
    }

    return true;
  });

  const finalFilteredProducts = filteredProducts.filter(product => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.tag.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6DBE45]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8]">
      <div className="bg-gradient-to-r from-[#DFC5FE] to-[#6DBE45]/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl font-bold text-[#6DBE45] mb-4">Best Sellers</h1>
          <p className="text-gray-700 text-lg">Discover our most loved skincare essentials crafted with nature&apos;s finest</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <SlidersHorizontal className="w-5 h-5 text-[#6DBE45]" />
            <span className="font-medium">Filters</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full px-6 py-3 pr-10 font-medium text-gray-700 hover:border-[#6DBE45] focus:outline-none focus:ring-2 focus:ring-[#6DBE45] cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Skin Type</h3>
                <div className="space-y-2">
                  {skinTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedSkinType.includes(type.toLowerCase().replace(' skin types', 'all').replace(' ', ''))}
                        onChange={() => handleSkinTypeToggle(type)}
                        className="w-5 h-5 text-[#6DBE45] border-gray-300 rounded focus:ring-[#6DBE45] cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-[#6DBE45] transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'all'}
                      onChange={() => setPriceRange('all')}
                      className="w-5 h-5 text-[#6DBE45] border-gray-300 focus:ring-[#6DBE45] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#6DBE45] transition-colors">All Prices</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'under500'}
                      onChange={() => setPriceRange('under500')}
                      className="w-5 h-5 text-[#6DBE45] border-gray-300 focus:ring-[#6DBE45] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#6DBE45] transition-colors">Under ₹500</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === '500to700'}
                      onChange={() => setPriceRange('500to700')}
                      className="w-5 h-5 text-[#6DBE45] border-gray-300 focus:ring-[#6DBE45] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#6DBE45] transition-colors">₹500 - ₹700</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'above700'}
                      onChange={() => setPriceRange('above700')}
                      className="w-5 h-5 text-[#6DBE45] border-gray-300 focus:ring-[#6DBE45] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#6DBE45] transition-colors">Above ₹700</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {finalFilteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
              tag={product.tag}
              onClick={() => navigate(`/product/${product._id}`)}
              onAddToCart={() => { }}
            />
          ))}
        </div>

        {finalFilteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {searchQuery
                ? `No products found matching "${searchQuery}"`
                : "No products found matching your filters."}
            </p>
          </div>
        )}
      </div>

      <section className="bg-gradient-to-r from-[#DFC5FE] to-[#6DBE45] py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Save More with Nature&apos;s Combos
          </h2>
          <p className="text-white text-lg mb-6">
            Shop the Lavanta Glow Set and get complete skincare at exclusive prices
          </p>
          <button className="bg-white text-[#6DBE45] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
            Explore Combos
          </button>
        </div>
      </section>
    </div>
  );
}
