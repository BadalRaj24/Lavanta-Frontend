import { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, Home, X, Check, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddressPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        fullName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        isDefault: false
    });

    useEffect(() => {
        fetchAddresses();
    }, [user]);

    const fetchAddresses = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            const { data } = await api.get('/users/address', config);
            setAddresses(data);
        } catch (error) {
            console.error('Failed to fetch addresses');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            await api.post('/users/address', formData, config);
            setMessage({ type: 'success', text: 'Address added successfully' });
            setIsAdding(false);
            setFormData({
                fullName: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                isDefault: false
            });
            fetchAddresses();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add address' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            await api.delete(`/users/address/${id}`, config);
            fetchAddresses();
        } catch (error) {
            console.error('Failed to delete address');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/profile')}
                        className="text-gray-500 hover:text-[#6DBE45] transition-colors"
                    >
                        &larr; Back to Profile
                    </button>
                    <h1 className="font-serif text-3xl font-bold text-[#6DBE45]">Manage Addresses</h1>
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                {isAdding && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#DFC5FE]/50 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Add New Address</h3>
                            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Street Address</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div className="md:col-span-2 flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    id="isDefault"
                                    className="w-4 h-4 text-[#6DBE45] focus:ring-[#6DBE45] border-gray-300 rounded"
                                />
                                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">Set as default address</label>
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#6DBE45] text-white font-bold py-3 rounded-xl hover:bg-[#5da838] transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center"
                                >
                                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="space-y-6">
                    {addresses.length === 0 && !isAdding && (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No addresses found.</p>
                            <p className="text-gray-400 text-sm">Add an address to speed up checkout.</p>
                        </div>
                    )}

                    {addresses.map((addr) => (
                        <div key={addr._id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-100 hover:border-[#DFC5FE] transition-colors">
                            <div className="flex items-start space-x-4 mb-4 md:mb-0">
                                <div className="bg-[#DFC5FE]/20 p-3 rounded-full text-[#6DBE45]">
                                    <Home className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-3 mb-1">
                                        <span className="font-bold text-gray-800">{addr.fullName}</span>
                                        {addr.isDefault && (
                                            <span className="bg-[#6DBE45]/10 text-[#6DBE45] text-xs px-2 py-0.5 rounded-full font-bold flex items-center">
                                                <Check className="w-3 h-3 mr-1" /> Default
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-medium text-gray-700">{addr.street}</h4>
                                    <p className="text-gray-500 text-sm mt-1">{addr.city}, {addr.state} - {addr.zip}</p>
                                    <p className="text-gray-500 text-sm mt-1">Phone: {addr.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                                <button
                                    onClick={() => handleDelete(addr._id)}
                                    className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 flex items-center justify-center text-gray-500 hover:border-[#6DBE45] hover:text-[#6DBE45] hover:bg-[#6DBE45]/5 transition-all"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            <span className="font-medium">Add New Address</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
