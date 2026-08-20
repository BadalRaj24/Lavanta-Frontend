import { Trash2, ShoppingBag, ArrowLeft, Gift } from 'lucide-react';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../hooks/useCampaign';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, total, originalTotal, birthdayDiscount, cartCount, getItemUnitPrice } = useCart();
    const navigate = useNavigate();
    const { isActive: isBirthdayActive, config } = useCampaign();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8 relative">
                    <button
                        onClick={() => navigate('/products')}
                        className="absolute left-0 p-2 text-[#6DBE45] hover:text-[#5aa538] transition-colors rounded-full hover:bg-green-50"
                        title="Back to Shopping"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="font-serif text-4xl font-bold text-[#6DBE45] w-full text-center flex items-center justify-center">
                        Your Shopping Cart
                    </h1>
                </div>

                {isBirthdayActive && (
                    <div className="mb-6 bg-gradient-to-r from-amber-500/10 via-[#6DBE45]/10 to-amber-500/10 border border-amber-300/60 rounded-2xl p-4 flex items-center justify-between text-amber-900 shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Gift className="w-5 h-5 text-amber-700" />
                            <span className="font-bold text-sm sm:text-base">Birthday Bash Offer Applied!</span>
                        </div>
                        <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase">
                            50% OFF
                        </span>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    {cart.length > 0 ? (
                        <div className="space-y-6">
                            {cart.map((item) => {
                                if (!item.product) return null;
                                const unitPrice = getItemUnitPrice(item.product);
                                const itemOriginalPrice = item.product.originalPrice || config.ORIGINAL_PRICE;
                                return (
                                    <div key={item.product._id} className="flex items-center justify-between border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                        <div className="flex items-center space-x-4">
                                            <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                                            <div>
                                                <h3 className="font-semibold text-gray-800 text-lg">{item.product.name}</h3>
                                                <div className="flex items-baseline space-x-2 mt-1">
                                                    {isBirthdayActive && (
                                                        <span className="text-gray-400 line-through text-xs font-medium">
                                                            ₹{itemOriginalPrice}
                                                        </span>
                                                    )}
                                                    <span className="text-[#6DBE45] font-bold text-lg">₹{unitPrice}</span>
                                                    {isBirthdayActive && (
                                                        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                                                            50% OFF
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                    className="text-[#6DBE45] font-bold text-lg disabled:opacity-50"
                                                >
                                                    -
                                                </button>
                                                <span className="font-medium text-gray-800">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                    className="text-[#6DBE45] font-bold text-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product._id)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 flex flex-col items-center">
                            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg">Your cart is empty.</p>
                            <button onClick={() => navigate('/products')} className="text-[#6DBE45] font-medium mt-4 hover:underline">
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="space-y-3 mb-6">
                            {isBirthdayActive && birthdayDiscount > 0 && (
                                <>
                                    <div className="flex justify-between items-center text-gray-500 text-sm">
                                        <span>Original Price ({cartCount} items)</span>
                                        <span className="line-through">₹{originalTotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-green-600 text-sm font-semibold">
                                        <span>🎂 Birthday Bash Discount (50% OFF)</span>
                                        <span>-₹{birthdayDiscount}</span>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                <span className="text-gray-800 font-bold text-lg">Subtotal ({cartCount} items)</span>
                                <span className="text-2xl font-bold font-serif text-[#6DBE45]">₹{total}</span>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-[#6DBE45] hover:bg-[#5da838] text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                            onClick={() => navigate('/checkout', { state: { isCartCheckout: true } })}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
