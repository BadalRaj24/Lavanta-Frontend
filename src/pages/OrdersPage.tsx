import { useState, useEffect } from 'react';
import { Package, Calendar } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Order {
    _id: string;
    items: Array<{
        name: string;
        price: number;
        quantity: number;
    }>;
    totalAmount: number;
    finalAmount?: number;
    discountAmount?: number;
    promoCode?: string;
    status: string;
    createdAt: string;
}

export default function OrdersPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get(`/orders/user/${user.email}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6DBE45]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-[#6DBE45] mb-8 text-center">Your Orders</h1>

                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                            <div className="w-12 h-12 bg-[#DFC5FE]/20 rounded-full flex items-center justify-center text-[#6DBE45]">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Order ID</p>
                                                <h3 className="font-bold text-gray-800">#{order._id.slice(-6).toUpperCase()}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 flex items-center justify-end"><Calendar className="w-3 h-3 mr-1" /> Date placed</p>
                                                <p className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <h4 className="font-medium text-gray-700 mb-4">Items</h4>
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600 flex items-center">
                                                        <span className="w-2 h-2 bg-[#6DBE45] rounded-full mr-2"></span>
                                                        {item.quantity}x {item.name}
                                                    </span>
                                                    <span className="font-medium text-gray-800">₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 mt-6 pt-4 flex flex-col md:flex-row justify-between items-end md:items-center">
                                        <span className="text-gray-600 font-medium mb-2 md:mb-0">Total Amount</span>
                                        <div className="text-right">
                                            {order.discountAmount && order.discountAmount > 0 ? (
                                                <>
                                                    <span className="text-sm text-gray-400 line-through mr-2">₹{order.totalAmount}</span>
                                                    <span className="text-xl font-bold text-[#6DBE45]">₹{order.finalAmount}</span>
                                                    <div className="text-xs text-green-600 mt-1 flex flex-col items-end">
                                                        <span>You saved ₹{order.discountAmount}</span>
                                                        {order.promoCode && <span className="font-semibold">Code: {order.promoCode}</span>}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-xl font-bold text-[#6DBE45]">₹{order.totalAmount}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-6">You haven't placed any orders yet.</p>
                            <button
                                onClick={() => navigate('/products')}
                                className="bg-[#6DBE45] text-white px-8 py-3 rounded-full hover:bg-[#5da838] transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
