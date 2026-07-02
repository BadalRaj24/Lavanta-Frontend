import { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, X, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function SavedCardsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        type: 'Visa',
        number: '',
        holder: '',
        expiry: '',
        cvc: ''
    });

    useEffect(() => {
        if (user) {
            fetchCards();
        }
    }, [user]);

    const fetchCards = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            const { data } = await api.get('/users/cards', config);
            setCards(data);
        } catch (error) {
            console.error('Failed to fetch cards');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value = e.target.value;
        if (e.target.name === 'expiry') {
            // Simple logic to add slash for expiry
            if (value.length === 2 && formData.expiry.length === 1) {
                value += '/';
            }
        }
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
            await api.post('/users/cards', formData, config);
            setMessage({ type: 'success', text: 'Card added successfully' });
            setIsAdding(false);
            setFormData({
                type: 'Visa',
                number: '',
                holder: '',
                expiry: '',
                cvc: ''
            });
            fetchCards();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add card' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this card?')) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            await api.delete(`/users/cards/${id}`, config);
            fetchCards();
        } catch (error) {
            console.error('Failed to delete card');
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
                    <h1 className="font-serif text-3xl font-bold text-[#6DBE45]">Saved Cards</h1>
                    <div className="w-20"></div>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                {isAdding && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#DFC5FE]/50 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Add New Card</h3>
                            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                >
                                    <option value="Visa">Visa</option>
                                    <option value="Mastercard">Mastercard</option>
                                    <option value="Amex">Amex</option>
                                    <option value="Rupay">Rupay</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleChange}
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Holder Name</label>
                                <input
                                    type="text"
                                    name="holder"
                                    value={formData.holder}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                                <input
                                    type="text"
                                    name="cvc"
                                    value={formData.cvc}
                                    onChange={handleChange}
                                    placeholder="123"
                                    maxLength={4}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6DBE45]/20 focus:outline-none"
                                />
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#6DBE45] text-white font-bold py-3 rounded-xl hover:bg-[#5da838] transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center"
                                >
                                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Save Card'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {cards.map((card) => (
                        <div key={card._id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDelete(card._id)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex justify-between items-start mb-8">
                                <CreditCard className="w-8 h-8 opacity-80" />
                                <span className="font-mono text-lg tracking-widest italic opacity-60">{card.type}</span>
                            </div>
                            <div className="mb-6">
                                <p className="font-mono text-2xl tracking-widest">
                                    {/* Simple masking to show only last 4 digits if length varies */}
                                    {'•'.repeat(Math.max(0, card.number.length - 4)) + card.number.slice(-4)}
                                </p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Card Holder</p>
                                    <p className="font-medium tracking-wide">{card.holder}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Expires</p>
                                    <p className="font-medium tracking-wide">{card.expiry}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#6DBE45] hover:text-[#6DBE45] transition-all hover:bg-[#6DBE45]/5 min-h-[220px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-[#6DBE45]/20">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-medium">Add New Card</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
