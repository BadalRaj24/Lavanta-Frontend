import { Search, ShoppingCart, User, CreditCard, MapPin, Phone, LogIn, LogOut, Star, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AnnouncementBar from './campaign/AnnouncementBar';
import { useCampaign } from '../hooks/useCampaign';

export default function Header() {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { isActive: isBirthdayActive } = useCampaign();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };

    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // scrolling down & passed threshold
          setIsVisible(false);
        } else { // scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', controlNavbar);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    setLoginDropdownOpen(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    ...(isBirthdayActive ? [{ label: '🎂 Birthday Bash', path: '/products' }] : []),
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchQuery('');
    }
  }, [location.pathname]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isCurrentPage = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Birthday Campaign Announcement Bar */}
      <AnnouncementBar onOfferClick={() => navigate('/products')} />

      {/* Top Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer">
              <img
                src="/lavantalogo.jpg"
                alt="Lavanta Naturals Logo"
                className="w-16 h-16 xl:w-32 xl:h-32 object-contain transition-all duration-300"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 xl:mx-8">
              <div className="relative">
                <div className="flex">
                  <div className="relative flex-1 group">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#6DBE45] focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      placeholder="Search..."
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-[#6DBE45] text-white px-3 xl:px-6 py-2 rounded-r-lg hover:bg-[#5da838] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2 shadow-sm hover:shadow-md"
                  >
                    <Search className="w-5 h-5" />
                    <span className="font-medium hidden xl:inline">Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 xl:space-x-6 flex-shrink-0">
              {/* Cart */}
              {user && (
                <Link
                  to="/cart"
                  className="flex items-center space-x-3 text-gray-600 hover:text-[#6DBE45] transition-colors px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:border-[#6DBE45] relative bg-white"
                >
                  <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="font-semibold text-lg hidden md:inline">Cart</span>
                  <span className="absolute -top-2 -right-2 bg-[#6DBE45] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
                </Link>
              )}


              {/* Login Dropdown */}
              <div className="relative block" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-3 text-gray-600 hover:text-[#6DBE45] transition-colors px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:border-[#6DBE45]"
                  onClick={() => {
                    if (user) {
                      setLoginDropdownOpen(!loginDropdownOpen);
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  <User className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="font-semibold text-lg hidden md:inline">{user ? user.name.split(' ')[0] : 'Login'}</span>
                </button>

                {loginDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="py-2">
                      {user ? (
                        <>
                          {user.isAdmin && (
                            <button
                              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors bg-gray-50 mb-1"
                              onClick={() => {
                                navigate('/admin');
                                setLoginDropdownOpen(false);
                              }}
                            >
                              <LayoutDashboard className="w-5 h-5 text-[#6DBE45]" />
                              <span className="font-semibold text-gray-900">Admin Dashboard</span>
                            </button>
                          )}
                          <Link
                            to="/profile"
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setLoginDropdownOpen(false)}
                          >
                            <User className="w-5 h-5 text-[#6DBE45]" />
                            <span className="text-gray-700">Your Profile</span>
                          </Link>

                          <Link
                            to="/profile-reviews"
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setLoginDropdownOpen(false)}
                          >
                            <Star className="w-5 h-5 text-[#6DBE45]" />
                            <span className="text-gray-700">Your Reviews</span>
                          </Link>

                          <Link
                            to="/orders"
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setLoginDropdownOpen(false)}
                          >
                            <ShoppingCart className="w-5 h-5 text-[#6DBE45]" />
                            <span className="text-gray-700">Your Orders</span>
                          </Link>

                          <Link
                            to="/cards"
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setLoginDropdownOpen(false)}
                          >
                            <CreditCard className="w-5 h-5 text-[#6DBE45]" />
                            <span className="text-gray-700">Saved Cards</span>
                          </Link>

                          <Link
                            to="/address"
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setLoginDropdownOpen(false)}
                          >
                            <MapPin className="w-5 h-5 text-[#6DBE45]" />
                            <span className="text-gray-700">Manage Address</span>
                          </Link>

                          <Link
                            to="/contact"
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setLoginDropdownOpen(false)}
                          >
                            <Phone className="w-5 h-5 text-[#6DBE45]" />
                            <span className="text-gray-700">Contact Us</span>
                          </Link>

                          <div className="border-t border-gray-200 mt-2 p-2">
                            <button
                              className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                              onClick={handleLogout}
                            >
                              <LogOut className="w-4 h-4" />
                              <span>LOGOUT</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="border-t border-gray-200 mt-2 p-2">
                          <button
                            className="w-full bg-[#6DBE45] text-white py-2 rounded-lg font-medium hover:bg-[#5da838] transition-colors flex items-center justify-center space-x-2"
                            onClick={() => {
                              navigate('/login');
                              setLoginDropdownOpen(false);
                            }}
                          >
                            <LogIn className="w-4 h-4" />
                            <span>LOGIN</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-8 py-2 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-[#6DBE45] hover:scale-110 transform whitespace-nowrap ${isCurrentPage(item.path) ? 'text-[#6DBE45] font-semibold' : 'text-gray-700'
                  }`}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </div>


    </header >
  );
}
