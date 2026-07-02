import { useState, useEffect } from 'react';
import { Lock, LayoutDashboard, ShoppingBag, Users, Package, LogOut, CheckCircle, Edit2, X, MapPin, CreditCard, Eye, EyeOff, Mail, AlertCircle, Search, RefreshCcw, Plus, Menu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import api from '../api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Order Details Modal Component
function OrderDetailsModal({ order, onClose }: { order: any; onClose: () => void }) {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-100 animate-scale-up">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            Order <span className="text-[#6DBE45] ml-2">#{order._id.slice(-6).toUpperCase()}</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Customer & Address */}
                    <div className="space-y-6">
                        {/* Customer Details Card */}
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <Users className="w-5 h-5 mr-2 text-[#6DBE45]" />
                                Customer Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-[#6DBE45]/10 flex items-center justify-center text-[#6DBE45] font-bold mr-3 text-lg">
                                        {order.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{order.user.name}</p>
                                        <p className="text-sm text-gray-500">{order.user.email}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1 pl-1">
                                    <p><span className="font-semibold text-gray-700">Customer ID:</span> {order.user._id || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address Card */}
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-[#6DBE45]" />
                                Shipping Address
                            </h3>
                            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm text-gray-700 leading-relaxed">
                                {order.user.address ? (
                                    <>
                                        <p className="font-medium">{order.user.address}</p>
                                        <p>{order.user.city}, {order.user.state || ''} {order.user.zip}</p>
                                        <p>{order.user.country || 'India'}</p>
                                    </>
                                ) : (
                                    <p className="text-gray-400 italic">No address provided</p>
                                )}
                            </div>
                        </div>

                        {/* Order Summary Card */}
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-[#6DBE45]" />
                                Payment Info
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200">
                                    <span className="text-gray-600">Payment Status</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200">
                                    <span className="text-gray-600">Order Status</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold text-gray-800">
                                        ₹{(order.finalAmount || order.totalAmount) + (order.discountAmount || 0)}
                                    </span>
                                </div>
                                {order.discountAmount > 0 && (
                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 text-green-600">
                                        <span>Discount ({order.promoCode || 'Applied'})</span>
                                        <span className="font-bold">-₹{order.discountAmount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                                    <span className="text-2xl font-bold text-[#6DBE45]">
                                        ₹{order.finalAmount || order.totalAmount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Items */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 h-full">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <ShoppingBag className="w-5 h-5 mr-2 text-[#6DBE45]" />
                                Order Items ({order.items?.length || 0})
                            </h3>
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {order.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4 hover:border-[#6DBE45] transition-colors">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            {item.product?.image ? (
                                                <img src={item.product.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Package className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-sm text-gray-500">Qty: <span className="font-semibold text-gray-900">{item.quantity}</span></p>
                                                <p className="font-bold text-[#6DBE45]">₹{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



// User Modal Component (Create & Edit)
function UserModal({
    user,
    onClose,
    onSuccess
}: {
    user?: any;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        phone: user?.phone || '',
        isAdmin: user?.isAdmin || false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (user) {
                // Update existing user
                const updateData: any = { ...formData };
                if (!updateData.password) delete updateData.password; // Don't send empty password
                await api.put(`/users/${user._id}`, updateData);
            } else {
                // Create new user
                await api.post('/users', formData);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || `Failed to ${user ? 'update' : 'create'} user`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-100 animate-scale-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">{user ? 'Edit User' : 'Create New User'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password {user && '(Leave empty to keep current)'}</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required={!user}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none pr-10"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] outline-none"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            className="w-4 h-4 text-[#6DBE45] focus:ring-[#6DBE45] border-gray-300 rounded"
                            checked={formData.isAdmin}
                            onChange={e => setFormData({ ...formData, isAdmin: e.target.checked })}
                        />
                        <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">Grant Admin Privileges</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6DBE45] text-white py-2.5 rounded-lg font-bold hover:bg-[#5da838] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create User'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function AdminPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        orders: 0,
        users: 0,
        revenue: 0,
        returns: 0
    });
    const [orders, setOrders] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Stock Editing State
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [editStockValue, setEditStockValue] = useState<number>(0);
    const [markingReturned, setMarkingReturned] = useState<string | null>(null);
    const [returnConfirmOrder, setReturnConfirmOrder] = useState<string | null>(null); // New state for modal
    const [isUpdatingStock, setIsUpdatingStock] = useState(false);
    const { addToast } = useToast();

    const { user, logout, loading: authLoading } = useAuth();
    // ... keep existing functions ...

    useEffect(() => {
        if (authLoading) return; // Wait for auth to initialize
        if (user?.isAdmin) {
            fetchData();
        } else {
            navigate('/login');
        }
    }, [user, navigate, authLoading]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ordersRes, usersRes, productsRes] = await Promise.all([
                api.get('/orders'),
                api.get('/users'),
                api.get('/products')
            ]);

            setOrders(ordersRes.data);
            setUsers(usersRes.data);
            setProducts(productsRes.data);

            const totalRevenue = ordersRes.data
                .filter((order: any) => order.status !== 'Returned')
                .reduce((acc: number, order: any) => acc + order.totalAmount, 0);


            setStats({
                orders: ordersRes.data.filter((order: any) => order.status !== 'Returned').length,
                users: usersRes.data.length,
                revenue: totalRevenue,
                returns: ordersRes.data.filter((order: any) => order.status === 'Returned').length
            });

        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkDelivered = async (orderId: string) => {
        try {
            await api.put(`/orders/${orderId}/deliver`);
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: 'Delivered' } : order
            ));
            addToast('success', 'Order marked as delivered');
        } catch (error) {
            console.error('Error updating order:', error);
            addToast('error', 'Failed to update order');
        }
    };

    const initiateReturn = (orderId: string) => {
        setReturnConfirmOrder(orderId);
    };

    const confirmReturn = async () => {
        if (!returnConfirmOrder) return;
        setMarkingReturned(returnConfirmOrder);
        try {
            await api.put(`/orders/${returnConfirmOrder}/return`);
            addToast('success', 'Order marked as returned');
            fetchData();
        } catch (error) {
            console.error('Error updating order:', error);
            addToast('error', 'Failed to update order');
        } finally {
            setMarkingReturned(null);
            setReturnConfirmOrder(null);
        }
    };

    const handleUpdateStock = async (productId: string) => {
        if (isUpdatingStock) return;
        setIsUpdatingStock(true);
        try {
            const { data } = await api.put(`/products/${productId}/add-stock`, { amount: editStockValue });

            // Update local state
            setProducts(products.map(p => p._id === productId ? { ...p, stock: data.stock } : p));
            setEditingProductId(null);
            addToast('success', 'Stock added successfully');
        } catch (error) {
            console.error('Error adding stock:', error);
            addToast('error', 'Failed to add stock');
        } finally {
            setIsUpdatingStock(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.delete(`/users/${userId}`);
            addToast('success', 'User deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
            addToast('error', 'Failed to delete user');
        }
    };

    const handleEditUser = (user: any) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const startEditingCheck = (product: any) => {
        setEditingProductId(product._id);
        setEditStockValue(0);
    };

    const handleResendVerification = async (userId: string) => {
        try {
            await api.post('/users/resend-verification', { userId });
            addToast('success', 'Verification email sent successfully');
        } catch (error: any) {
            console.error('Error sending verification email:', error);
            addToast('error', error.response?.data?.message || 'Failed to send verification email');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const filteredOrders = orders.filter(order => {
        if (order.status === 'Returned') return false;
        const query = searchQuery.toLowerCase();
        return (
            order._id.toLowerCase().includes(query) ||
            order.user.name.toLowerCase().includes(query) ||
            order.user.email.toLowerCase().includes(query)
        );
    });

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6DBE45]"></div>
            </div>
        );
    }

    if (!user?.isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-4">You do not have permission to view this page.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="text-[#6DBE45] font-medium hover:underline"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-100 font-sans flex flex-col overflow-hidden">
            <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-20 relative border-b border-gray-200">
                <div className="flex items-center">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <img
                        src="/lavantalogo.jpg"
                        alt="Lavanta Naturals"
                        className="h-10 w-10 object-contain rounded-full mr-3 border border-gray-100"
                    />
                    <span className="text-xl font-bold text-[#6DBE45] tracking-tight">
                        Welcome Admin, <span className="text-gray-700">{user?.name || 'User'}</span>
                    </span>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl flex flex-col border-r border-gray-100 
                    transform transition-transform duration-300 ease-in-out
                    md:static md:translate-x-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <nav className="p-4 space-y-2 flex-1 mt-4">
                        <button
                            onClick={() => {
                                setActiveTab('dashboard');
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-[#6DBE45] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('orders');
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${activeTab === 'orders' ? 'bg-[#6DBE45] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <ShoppingBag className="w-5 h-5 mr-3" /> Orders
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('inventory');
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${activeTab === 'inventory' ? 'bg-[#6DBE45] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Package className="w-5 h-5 mr-3" /> Inventory
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('returns');
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${activeTab === 'returns' ? 'bg-[#6DBE45] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <RefreshCcw className="w-5 h-5 mr-3" /> Returns
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('users');
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${activeTab === 'users' ? 'bg-[#6DBE45] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Users className="w-5 h-5 mr-3" /> Users
                        </button>
                    </nav>
                    <div className="p-4 border-t border-gray-100 space-y-2">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center p-3 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                        >
                            <LogOut className="w-5 h-5 mr-3 rotate-180" /> Switch to User View
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
                        >
                            <LogOut className="w-5 h-5 mr-3" /> Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6DBE45]"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'dashboard' && (
                                <div className="space-y-8 animate-fadeIn">
                                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border-l-4 border-[#6DBE45] hover:shadow-md transition-shadow">
                                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Revenue</h3>
                                            <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">₹{stats.revenue.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border-l-4 border-[#CFAFF7] hover:shadow-md transition-shadow">
                                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Orders</h3>
                                            <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">{stats.orders}</p>
                                        </div>
                                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border-l-4 border-red-400 hover:shadow-md transition-shadow">
                                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Returns</h3>
                                            <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">{stats.returns}</p>
                                        </div>
                                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border-l-4 border-blue-400 hover:shadow-md transition-shadow">
                                            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Users</h3>
                                            <p className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">{stats.users}</p>
                                        </div>
                                    </div>

                                    {/* Dashboard Charts */}
                                    <div className="grid lg:grid-cols-2 gap-8 pt-6">
                                        {/* Revenue Chart */}
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                                <div className="w-3 h-8 bg-[#6DBE45] rounded-full mr-3"></div>
                                                Revenue Overview
                                            </h3>
                                            <div className="h-[300px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart
                                                        data={orders
                                                            .filter((order: any) => order.status !== 'Returned')
                                                            .reduce((acc: any[], order: any) => {
                                                                const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                                                const existing = acc.find(item => item.name === date);
                                                                if (existing) {
                                                                    existing.revenue += order.totalAmount;
                                                                } else {
                                                                    acc.push({ name: date, revenue: order.totalAmount });
                                                                }
                                                                return acc;
                                                            }, []).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()).slice(-7)} // Last 7 unique days
                                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                                    >
                                                        <defs>
                                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#6DBE45" stopOpacity={0.8} />
                                                                <stop offset="95%" stopColor="#6DBE45" stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                                                        <Tooltip
                                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }}
                                                            itemStyle={{ color: '#1F2937', fontWeight: 600 }}
                                                        />
                                                        <Area type="monotone" dataKey="revenue" stroke="#6DBE45" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Orders Chart */}
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                                <div className="w-3 h-8 bg-[#CFAFF7] rounded-full mr-3"></div>
                                                Order Volume
                                            </h3>
                                            <div className="h-[300px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        data={orders
                                                            .filter((order: any) => order.status !== 'Returned')
                                                            .reduce((acc: any[], order: any) => {
                                                                const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                                                const existing = acc.find(item => item.name === date);
                                                                if (existing) {
                                                                    existing.orders += 1;
                                                                } else {
                                                                    acc.push({ name: date, orders: 1 });
                                                                }
                                                                return acc;
                                                            }, []).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()).slice(-7)} // Last 7 unique days
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                                        <Tooltip
                                                            cursor={{ fill: 'transparent' }}
                                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }}
                                                            itemStyle={{ color: '#1F2937', fontWeight: 600 }}
                                                        />
                                                        <Bar dataKey="orders" fill="#CFAFF7" radius={[4, 4, 0, 0]} barSize={40} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
                                        <div className="relative w-full md:w-96">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                placeholder="Search by Order ID, Customer, or Email..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6DBE45] focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                                        <th className="p-5">Order ID</th>
                                                        <th className="p-5">Customer</th>
                                                        <th className="p-5">Products</th>
                                                        <th className="p-5">Date</th>
                                                        <th className="p-5">Amount</th>
                                                        <th className="p-5">Promo</th>
                                                        <th className="p-5">Status</th>
                                                        <th className="p-5 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {filteredOrders.map((order) => (
                                                        <tr key={order._id} className="hover:bg-gray-50/80 transition-colors group">
                                                            <td className="p-5 font-mono text-sm font-medium text-gray-600">
                                                                #{order._id.slice(-6).toUpperCase()}
                                                            </td>
                                                            <td className="p-5">
                                                                <div className="flex flex-col">
                                                                    <span className="font-semibold text-gray-900">{order.user.name}</span>
                                                                    <span className="text-xs text-gray-500">{order.user.email}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-5">
                                                                <div className="flex flex-col max-w-[180px]">
                                                                    {order.items && order.items.length > 0 ? (
                                                                        <>
                                                                            <span className="text-sm text-gray-800 font-medium truncate" title={order.items[0].name}>
                                                                                {order.items[0].name}
                                                                            </span>
                                                                            {order.items.length > 1 && (
                                                                                <span className="text-xs text-gray-500 mt-1 pl-2 border-l-2 border-gray-200">
                                                                                    +{order.items.length - 1} more items
                                                                                </span>
                                                                            )}
                                                                        </>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-xs italic">No items</span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="p-5 text-sm text-gray-600">
                                                                {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </td>
                                                            <td className="p-5">
                                                                <span className="font-bold text-gray-900">₹{order.finalAmount || order.totalAmount}</span>
                                                            </td>
                                                            <td className="p-5">
                                                                {order.promoCode ? (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                                                        {order.promoCode}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-gray-400 text-xs">-</span>
                                                                )}
                                                            </td>
                                                            <td className="p-5">
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                                                    order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                                        order.status === 'Returned' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-100 text-gray-700 border-gray-200'
                                                                    }`}>
                                                                    {order.status === 'Processing' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>}
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-5 text-right">
                                                                <div className="flex items-center justify-end space-x-2 opacity-100 group-hover:opacity-100 transition-opacity">
                                                                    <button
                                                                        onClick={() => setSelectedOrder(order)}
                                                                        className="p-2 text-gray-500 hover:text-[#6DBE45] hover:bg-[#6DBE45]/10 rounded-lg transition-colors"
                                                                        title="View Details"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    {order.status !== 'Delivered' && order.status !== 'Returned' && (
                                                                        <button
                                                                            onClick={() => handleMarkDelivered(order._id)}
                                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                            title="Mark Delivered"
                                                                        >
                                                                            <CheckCircle className="w-4 h-4" />
                                                                        </button>
                                                                    )}
                                                                    {order.status !== 'Returned' && (
                                                                        <button
                                                                            onClick={() => initiateReturn(order._id)}
                                                                            disabled={markingReturned === order._id}
                                                                            className={`p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${markingReturned === order._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                            title="Mark Returned"
                                                                        >
                                                                            <RefreshCcw className={`w-4 h-4 ${markingReturned === order._id ? 'animate-spin' : ''}`} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}



                            {activeTab === 'returns' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h1 className="text-3xl font-bold text-gray-800">Returned Orders</h1>
                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                                    <tr>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Order ID</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Customer</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Date</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Amount</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Promo</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {orders.filter(order => order.status === 'Returned').length > 0 ? (
                                                        orders.filter(order => order.status === 'Returned').map((order) => (
                                                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                                <td className="p-4 font-mono text-xs text-gray-500">#{order._id.slice(-6).toUpperCase()}</td>
                                                                <td className="p-4">
                                                                    <div className="font-semibold text-gray-900">{order.user.name}</div>
                                                                    <div className="text-xs text-gray-500">{order.user.email}</div>
                                                                </td>
                                                                <td className="p-4 text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                                <td className="p-4 font-medium text-gray-900">₹{order.totalAmount}</td>
                                                                <td className="p-4">
                                                                    {order.promoCode ? (
                                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                                                            {order.promoCode}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-xs">-</span>
                                                                    )}
                                                                </td>
                                                                <td className="p-4">
                                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">Returned</span>
                                                                </td>
                                                                <td className="p-4">
                                                                    <button
                                                                        onClick={() => setSelectedOrder(order)}
                                                                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                                        title="View Details"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={7} className="p-8 text-center text-gray-500">
                                                                No returned orders found.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'inventory' && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                                    <tr>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Product</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Category</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Price</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Rating</th>
                                                        <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Stock</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {products.map((product) => (
                                                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="p-4 flex items-center space-x-3">
                                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                                                <span className="font-semibold text-gray-900">{product.name}</span>
                                                            </td>
                                                            <td className="p-4 text-gray-600 capitalize text-sm">{product.category}</td>
                                                            <td className="p-4 font-medium text-gray-900">₹{product.price}</td>
                                                            <td className="p-4 text-gray-600 text-sm">{product.rating} / 5</td>
                                                            <td className="p-4">
                                                                {editingProductId === product._id ? (
                                                                    <div className="flex items-center space-x-2">
                                                                        <input
                                                                            type="number"
                                                                            value={editStockValue === 0 ? '' : editStockValue}
                                                                            onChange={(e) => setEditStockValue(parseInt(e.target.value) || 0)}
                                                                            placeholder="Add"
                                                                            className="w-20 px-2 py-1 border border-[#6DBE45] rounded-md focus:outline-none"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleUpdateStock(product._id)}
                                                                            disabled={isUpdatingStock}
                                                                            className={`p-1 text-green-600 rounded-full hover:bg-green-200 ${isUpdatingStock ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'bg-green-100'}`}
                                                                            title="Add Stock">
                                                                            <Plus className="w-4 h-4" />
                                                                        </button>
                                                                        <button onClick={() => setEditingProductId(null)} className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                                                                            <X className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center space-x-3 group">
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="font-mono font-medium text-gray-700">{product.stock}</span>
                                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' :
                                                                                product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                                                }`}>
                                                                                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                                                            </span>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => startEditingCheck(product)}
                                                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#6DBE45] transition-all"
                                                                            title="Edit Stock"
                                                                        >
                                                                            <Edit2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'users' && (
                                <div className="space-y-8 animate-fadeIn">
                                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                                        <button
                                            onClick={() => {
                                                setSelectedUser(null);
                                                setShowUserModal(true);
                                            }}
                                            className="bg-[#6DBE45] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5da838] transition-colors flex items-center shadow-lg transform hover:scale-105"
                                        >
                                            <Users className="w-5 h-5 mr-2" />
                                            Add New User
                                        </button>
                                    </div>

                                    {/* Administrators Section */}
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                            <Lock className="w-5 h-5 mr-2 text-[#6DBE45]" />
                                            Administrators
                                        </h2>
                                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead className="bg-[#6DBE45]/10 border-b border-[#6DBE45]/20">
                                                        <tr>
                                                            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Name</th>
                                                            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Email</th>
                                                            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Joined Date</th>
                                                            <th className="p-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {users.filter((u: any) => u.isAdmin).map((user) => (
                                                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                                                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                                                                <td className="p-4 text-gray-600">{user.email}</td>
                                                                <td className="p-4 text-gray-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                                <td className="p-4 flex items-center space-x-2">
                                                                    <button onClick={() => handleEditUser(user)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                                        <Edit2 className="w-4 h-4" />
                                                                    </button>
                                                                    {user._id !== user._id && ( // Prevent deleting self - check logic later
                                                                        <button onClick={() => handleDeleteUser(user._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                                            <Users className="w-4 h-4" /> {/* Should be trash but using Users for now if icon missing */}
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customers Section */}
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                            <Users className="w-5 h-5 mr-2 text-blue-500" />
                                            Registered Customers
                                        </h2>
                                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead className="bg-gray-50/50 border-b border-gray-100">
                                                        <tr>
                                                            <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Name</th>
                                                            <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Email</th>
                                                            <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                                                            <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Joined Date</th>
                                                            <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {users.filter((u: any) => !u.isAdmin).map((user) => (
                                                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                                                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                                                                <td className="p-4 text-gray-600">{user.email}</td>
                                                                <td className="p-4">
                                                                    {user.isVerified ? (
                                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                            <CheckCircle className="w-3 h-3 mr-1" /> Verified
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                            <AlertCircle className="w-3 h-3 mr-1" /> Pending
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="p-4 text-gray-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                                <td className="p-4 flex items-center space-x-2">
                                                                    {!user.isVerified && (
                                                                        <button
                                                                            onClick={() => handleResendVerification(user._id)}
                                                                            className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                                            title="Resend Verification Email"
                                                                        >
                                                                            <Mail className="w-4 h-4" />
                                                                        </button>
                                                                    )}
                                                                    <button onClick={() => handleEditUser(user)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                                        <Edit2 className="w-4 h-4" />
                                                                    </button>
                                                                    <button onClick={() => handleDeleteUser(user._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {
                selectedOrder && (
                    <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
                )
            }

            {
                showUserModal && (
                    <UserModal
                        user={selectedUser}
                        onClose={() => setShowUserModal(false)}
                        onSuccess={() => {
                            fetchData();
                            setShowUserModal(false);
                        }}
                    />
                )
            }
            {
                returnConfirmOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Return</h3>
                                <p className="text-gray-500 mb-6">
                                    Are you sure you want to mark this order as returned? This will automatically restore stock levels for all items in the order.
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => setReturnConfirmOrder(null)}
                                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmReturn}
                                        disabled={!!markingReturned}
                                        className={`px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transition-all ${markingReturned ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {markingReturned ? 'Processing...' : 'Confirm Return'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
