import { useState, useEffect } from 'react';
import { ChevronLeft, CreditCard, MapPin, Plus, Check, Tag } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface Address {
    _id?: string;
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    isDefault: boolean;
}

const loadScript = (src: string) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { product, quantity = 1, isCartCheckout = false } = location.state || {};

    const { user } = useAuth();
    const { cart, total: cartTotal, clearCart } = useCart();
    const { addToast } = useToast();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderPlacing, setOrderPlacing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Razorpay'>('Razorpay');

    // Promo Code State
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountAmount: number; discountType: string; discountValue: number } | null>(null);
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // New Address Form State
    const [newAddress, setNewAddress] = useState<Address>({
        fullName: user?.name || '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        phone: user?.phone || '',
        isDefault: false
    });

    const SHIPPING_COST = 0;
    const subtotal = isCartCheckout ? cartTotal : (product?.price || 0) * quantity;
    const discount = appliedPromo ? appliedPromo.discountAmount : 0;
    const finalTotal = Math.max(0, subtotal + SHIPPING_COST - discount);

    useEffect(() => {
        if (user) {
            fetchAddresses();
        }
    }, [user]);

    const fetchAddresses = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user?.token}` } };
            const { data } = await api.get('/users/address', config);
            setAddresses(data);
            if (data.length > 0) {
                const defaultAddr = data.find((a: Address) => a.isDefault);
                setSelectedAddressId(defaultAddr ? defaultAddr._id! : data[0]._id!);
            } else {
                setShowAddAddress(true);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user?.token}` } };
            await api.post('/users/address', newAddress, config);
            await fetchAddresses();
            setShowAddAddress(false);
            // Reset form but keep name/phone for convenience
            setNewAddress(prev => ({ ...prev, street: '', city: '', state: '', zip: '' }));
            addToast('success', 'Address saved successfully');
        } catch (error) {
            console.error('Error saving address:', error);
            addToast('error', 'Failed to save address');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) {
            setPromoMessage({ type: 'error', text: 'Please enter a promo code' });
            return;
        }

        setPromoLoading(true);
        setPromoMessage(null);

        try {
            const config = { headers: { Authorization: `Bearer ${user?.token}` } };
            const { data } = await api.post('/promos/validate', {
                code: promoCode,
                cartTotal: subtotal
            }, config);

            setAppliedPromo({
                code: data.code,
                discountAmount: data.discountAmount,
                discountType: data.discountType,
                discountValue: data.discountValue
            });
            setPromoMessage({ type: 'success', text: `Promo code applied! You saved ₹${data.discountAmount}` });
        } catch (error: any) {
            console.error('Promo apply error:', error);
            setAppliedPromo(null);
            setPromoMessage({ type: 'error', text: error.response?.data?.message || 'Invalid promo code' });
        } finally {
            setPromoLoading(false);
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
        setPromoMessage(null);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            addToast('error', 'Please select a shipping address');
            return;
        }

        const selectedAddress = addresses.find(a => a._id === selectedAddressId);
        if (!selectedAddress) return;

        setOrderPlacing(true);
        try {
            const orderItems = isCartCheckout
                ? cart.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity
                }))
                : [{
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                }];

            const orderData = {
                user: {
                    name: selectedAddress.fullName,
                    email: user?.email,
                    address: `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.zip}`,
                    city: selectedAddress.city,
                    zip: selectedAddress.zip,
                    phone: selectedAddress.phone
                },
                items: orderItems,
                totalAmount: subtotal, // Send original total
                promoCode: appliedPromo ? appliedPromo.code : undefined,
                paymentMethod: paymentMethod
            };

            if (paymentMethod === 'Razorpay') {
                const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
                if (!res) {
                    addToast('error', 'Razorpay SDK failed to load. Are you online?');
                    setOrderPlacing(false);
                    return;
                }

                // Get Razorpay Key
                const configConfig = { headers: { Authorization: `Bearer ${user?.token}` } };
                const keyRes = await api.get('/orders/config/razorpay', configConfig);
                const rzpKey = keyRes.data.key;

                // Create Razorpay Order
                const orderRes = await api.post('/orders/create-razorpay-order', { amount: finalTotal }, configConfig);
                const { id: order_id } = orderRes.data;

                const options = {
                    key: rzpKey,
                    amount: finalTotal * 100,
                    currency: 'INR',
                    name: 'Lavanta Naturals',
                    description: 'Test Transaction',
                    image: '/images/logo.png', // Assuming logo exists
                    order_id: order_id,
                    handler: async function (response: any) {
                        try {
                            const finalOrderData = {
                                ...orderData,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature
                            };
                            
                            const config = { headers: { Authorization: `Bearer ${user?.token}` } };
                            await api.post('/orders', finalOrderData, config);

                            if (isCartCheckout) {
                                await clearCart();
                            }
                            navigate('/order-success');
                        } catch (err: any) {
                            console.error(err);
                            addToast('error', err.response?.data?.message || 'Payment Verification Failed');
                        }
                    },
                    prefill: {
                        name: selectedAddress.fullName,
                        email: user?.email,
                        contact: selectedAddress.phone
                    },
                    theme: {
                        color: '#6DBE45'
                    }
                };

                const paymentObject = new (window as any).Razorpay(options);
                paymentObject.on('payment.failed', function (response: any) {
                    console.error(response.error);
                    addToast('error', 'Payment failed or was cancelled');
                });
                paymentObject.open();

            } else {
                // COD Flow
                const config = { headers: { Authorization: `Bearer ${user?.token}` } };
                await api.post('/orders', orderData, config);

                if (isCartCheckout) {
                    await clearCart();
                }
                navigate('/order-success');
            }

        } catch (error: any) {
            console.error('Order creation failed:', error);
            const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
            addToast('error', errorMessage);
        } finally {
            if (paymentMethod === 'COD') {
                setOrderPlacing(false);
            }
            // For Razorpay, we let the widget handle its own "loading" state since it opens asynchronously.
            // We'll set it to false here so the button isn't stuck if they close the widget,
            // BUT wait, if we set it false immediately, they can double click.
            // We will setOrderPlacing(false) after a small delay so they don't spam while widget opens.
            setTimeout(() => setOrderPlacing(false), 2000);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login to Checkout</h2>
                <button onClick={() => navigate('/login')} className="text-[#6DBE45] underline">Go to Login</button>
            </div>
        );
    }

    if (!isCartCheckout && !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No product selected</h2>
                <button onClick={() => navigate('/products')} className="text-[#6DBE45] underline">Back to Shop</button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => {
                        if (isCartCheckout) {
                            navigate('/cart');
                        } else {
                            navigate(`/product/${product?._id}`);
                        }
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#6DBE45] transition-colors mb-8"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to {isCartCheckout ? 'Cart' : 'Product'}</span>
                </button>

                <h1 className="font-serif text-4xl font-bold text-[#6DBE45] mb-8 text-center">Checkout</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: Address Selection */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Saved Addresses */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6 flex items-center justify-between">
                                <span className="flex items-center"><MapPin className="w-6 h-6 mr-2 text-[#6DBE45]" /> Shipping Address</span>
                            </h2>

                            {!showAddAddress ? (
                                <div className="space-y-4">
                                    {addresses.length === 0 ? (
                                        <p className="text-gray-500 text-center py-4">No saved addresses found. Please add one.</p>
                                    ) : (
                                        addresses.map((addr) => (
                                            <div
                                                key={addr._id}
                                                onClick={() => setSelectedAddressId(addr._id!)}
                                                className={`cursor-pointer border-2 rounded-xl p-4 flex items-start space-x-4 transition-all ${selectedAddressId === addr._id ? 'border-[#6DBE45] bg-[#6DBE45]/5' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${selectedAddressId === addr._id ? 'border-[#6DBE45]' : 'border-gray-400'
                                                    }`}>
                                                    {selectedAddressId === addr._id && <div className="w-2.5 h-2.5 rounded-full bg-[#6DBE45]" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{addr.fullName} <span className="ml-2 text-sm font-normal text-gray-500">{addr.phone}</span></h3>
                                                    <p className="text-gray-600 mt-1">{addr.street}, {addr.city}</p>
                                                    <p className="text-gray-600">{addr.state} - {addr.zip}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}

                                    {/* Add New Address Trigger */}
                                    <button
                                        onClick={() => setShowAddAddress(true)}
                                        className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-[#6DBE45] text-[#6DBE45] py-4 rounded-xl hover:bg-[#6DBE45]/5 transition-colors font-medium mt-4"
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>Add New Address</span>
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg text-gray-800">Add New Address</h3>
                                        <button
                                            onClick={() => setShowAddAddress(false)}
                                            className="text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <form onSubmit={handleAddressSubmit} className="space-y-4 animate-in fade-in slide-in-from-top-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                                                value={newAddress.fullName}
                                                onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Phone Number"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                                                value={newAddress.phone}
                                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Street Address, Appt, Suite"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                                            value={newAddress.street}
                                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                        />
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="State"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                            />
                                            <input
                                                type="text"
                                                placeholder="ZIP Code"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                                                value={newAddress.zip}
                                                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                                            />
                                        </div>
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-[#6DBE45] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5da838] transition-colors"
                                            >
                                                {loading ? 'Saving...' : 'Save & Use Address'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <CreditCard className="w-6 h-6 mr-2 text-[#6DBE45]" /> Payment Method
                            </h2>
                            <div className="space-y-4">
                                <div 
                                    onClick={() => setPaymentMethod('Razorpay')}
                                    className={`cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all ${paymentMethod === 'Razorpay' ? 'border-[#6DBE45] bg-[#6DBE45]/5' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center">
                                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${paymentMethod === 'Razorpay' ? 'border-[#6DBE45]' : 'border-gray-400'}`}>
                                            {paymentMethod === 'Razorpay' && <div className="w-2.5 h-2.5 rounded-full bg-[#6DBE45]" />}
                                        </div>
                                        <span className="font-medium text-gray-800">Online Payment (Razorpay)</span>
                                    </div>
                                    {paymentMethod === 'Razorpay' && <Check className="w-5 h-5 text-[#6DBE45]" />}
                                </div>
                                <div 
                                    onClick={() => setPaymentMethod('COD')}
                                    className={`cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all ${paymentMethod === 'COD' ? 'border-[#6DBE45] bg-[#6DBE45]/5' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center">
                                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-[#6DBE45]' : 'border-gray-400'}`}>
                                            {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 rounded-full bg-[#6DBE45]" />}
                                        </div>
                                        <span className="font-medium text-gray-800">Cash on Delivery</span>
                                    </div>
                                    {paymentMethod === 'COD' && <Check className="w-5 h-5 text-[#6DBE45]" />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                            <h3 className="font-serif text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                            <div className="space-y-4 max-h-64 overflow-y-auto mb-4 p-4">
                                {isCartCheckout ? (
                                    cart.map((item) => (
                                        <div key={item.product._id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative mr-2">
                                                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100" />
                                                    <span className="absolute -top-2 -right-2 bg-[#6DBE45] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-md z-10">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 truncate w-32">{item.product.name}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold">₹{item.product.price * item.quantity}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">₹{product.price * quantity}</span>
                                    </div>
                                )}
                            </div>

                            {/* Promo Code Section */}
                            <div className="border-t border-gray-100 my-4 pt-4">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                    <Tag className="w-4 h-4 mr-2 text-[#6DBE45]" /> Promo Code
                                </h4>
                                {!appliedPromo ? (
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                            placeholder="Enter Code"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6DBE45] outline-none text-sm uppercase"
                                        />
                                        <button
                                            onClick={handleApplyPromo}
                                            disabled={promoLoading || !promoCode}
                                            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
                                        >
                                            {promoLoading ? '...' : 'Apply'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex justify-between items-center">
                                        <div>
                                            <p className="text-green-800 font-medium text-sm">Code: <span className="font-bold">{appliedPromo.code}</span></p>
                                            <p className="text-green-600 text-xs">Discount Applied!</p>
                                        </div>
                                        <button
                                            onClick={handleRemovePromo}
                                            className="text-gray-400 hover:text-red-500 text-sm font-bold px-2"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                                {promoMessage && (
                                    <p className={`text-xs mt-2 ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                        {promoMessage.text}
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-gray-100 my-4 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                {appliedPromo && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Discount</span>
                                        <span>-₹{appliedPromo.discountAmount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>₹{SHIPPING_COST}</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 my-4 pt-4">
                                <div className="flex justify-between text-lg font-bold text-[#6DBE45]">
                                    <span>Total</span>
                                    <span>₹{finalTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={orderPlacing || !selectedAddressId}
                                className="w-full bg-[#6DBE45] text-white py-4 rounded-lg font-bold hover:bg-[#5da838] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {orderPlacing ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
