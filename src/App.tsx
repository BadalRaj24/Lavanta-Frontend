import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import SavedCardsPage from './pages/SavedCardsPage';
import AddressPage from './pages/AddressPage';
import AdminPage from './pages/AdminPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ChatWithExpertPage from './pages/ChatWithExpertPage';
import ScrollToTop from './components/ScrollToTop';
import MobileStickyOffer from './components/campaign/MobileStickyOffer';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <ScrollToTop />
            <MobileStickyOffer />
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <Header />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<Navigate to="/" replace />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/order-success" element={<OrderSuccessPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile-reviews" element={<Navigate to="/profile?tab=reviews" replace />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/cards" element={<SavedCardsPage />} />
                        <Route path="/address" element={<AddressPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                        <Route path="/refund-policy" element={<RefundPolicyPage />} />
                        <Route path="/disclaimer" element={<DisclaimerPage />} />
                        {/* Auth Routes - No Header/Footer inside them if they are standalone, but here we wrap them */}
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
              {/* Standalone pages without Header/Footer */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
              <Route path="/chat-with-expert" element={<ChatWithExpertPage />} />

              {/* Catch all for admin if it needs to be standalone, but usually it's protected. keeping it inside main routes or separate? 
                  The original code had check: !['admin', ...].includes(currentPage). 
                  So admin page should presumably be standalone or have its own layout.
                  Let's keep AdminPage standalone based on original logic.
               */}
              <Route path="/admin/*" element={<AdminPage />} />

            </Routes>
          </div>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;


