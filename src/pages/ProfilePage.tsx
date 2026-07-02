import { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit2, Save, X, MapPin, Star, Trash2, MessageSquare, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Review {
    _id: string;
    product: {
        _id: string;
        name: string;
        image: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ProfilePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'profile';

    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Profile Data
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    // Reviews Data
    const [reviews, setReviews] = useState<Review[]>([]);
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ rating: 0, comment: '' });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || ''
            });

            if (activeTab === 'reviews') {
                fetchReviews();
            }
        }
    }, [user, activeTab]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchReviews = async () => {
        try {
            const { data } = await api.get('/reviews/myreviews');
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };

            const { data } = await api.put('/users/profile', formData, config);
            updateUser(data);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    const startEditingReview = (review: Review) => {
        setEditingReviewId(review._id);
        setEditForm({ rating: review.rating, comment: review.comment });
    };

    const cancelEditingReview = () => {
        setEditingReviewId(null);
        setEditForm({ rating: 0, comment: '' });
    };

    const handleSaveReview = async (id: string) => {
        try {
            await api.put(`/reviews/${id}`, editForm);
            setEditingReviewId(null);
            fetchReviews(); // Refresh list
            setMessage({ type: 'success', text: 'Review updated successfully' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error updating review:', error);
            setMessage({ type: 'error', text: 'Failed to update review' });
        }
    };

    const handleDeleteReview = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await api.delete(`/reviews/${id}`);
            fetchReviews(); // Refresh list
            setMessage({ type: 'success', text: 'Review deleted successfully' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error deleting review:', error);
            setMessage({ type: 'error', text: 'Failed to delete review' });
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-500">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-[#6DBE45] mb-8 text-center">
                    {activeTab === 'profile' ? 'Your Profile' : 'Your Reviews'}
                </h1>

                <div className="bg-white rounded-2xl shadow-lg p-0 overflow-hidden mb-8">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#DFC5FE] to-[#6DBE45]/30 p-8 text-center">
                        <div className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md overflow-hidden bg-white flex items-center justify-center text-3xl font-bold text-[#6DBE45]">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
                    </div>

                    <div className="p-8">
                        {/* Global Messages */}
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-xl text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        {activeTab === 'profile' ? (
                            <div className="space-y-8">
                                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg mx-auto">
                                    {/* Profile Form Fields (Same as before) */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="bg-white p-2 rounded-full shadow-sm">
                                            <User className="w-6 h-6 text-[#6DBE45]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-gray-300 focus:border-[#6DBE45] focus:outline-none py-1 text-gray-800 font-medium text-lg"
                                                />
                                            ) : (
                                                <p className="text-gray-800 font-medium text-lg">{user.name}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email (Read only) */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="bg-white p-2 rounded-full shadow-sm">
                                            <Mail className="w-6 h-6 text-[#6DBE45]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Email Address</label>
                                            <p className="text-gray-800 font-medium text-lg">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="bg-white p-2 rounded-full shadow-sm">
                                            <Phone className="w-6 h-6 text-[#6DBE45]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Phone Number</label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-gray-300 focus:border-[#6DBE45] focus:outline-none py-1 text-gray-800 font-medium text-lg"
                                                />
                                            ) : (
                                                <p className="text-gray-800 font-medium text-lg">{user.phone || 'Not set'}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="bg-white p-2 rounded-full shadow-sm">
                                            <MapPin className="w-6 h-6 text-[#6DBE45]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Address</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b border-gray-300 focus:border-[#6DBE45] focus:outline-none py-1 text-gray-800 font-medium text-lg"
                                                    placeholder="Enter your address"
                                                />
                                            ) : (
                                                <p className="text-gray-800 font-medium text-lg">{user.address || 'Not set'}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-10 text-center flex justify-center space-x-4">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition-colors"
                                                >
                                                    <X className="w-5 h-5" />
                                                    <span>Cancel</span>
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="inline-flex items-center space-x-2 bg-[#6DBE45] text-white px-8 py-3 rounded-full hover:bg-[#5da838] transition-colors shadow-lg disabled:opacity-50"
                                                >
                                                    {loading ? <Save className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                                    <span>Save Changes</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(true)}
                                                    className="inline-flex items-center space-x-2 bg-[#6DBE45] text-white px-8 py-3 rounded-full hover:bg-[#5da838] transition-colors shadow-lg"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                    <span>Edit Profile</span>
                                                </button>
                                                {user.isAdmin && (
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate('/admin')}
                                                        className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                                                    >
                                                        <LayoutDashboard className="w-5 h-5" />
                                                        <span>Admin Dashboard</span>
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </form>


                            </div>
                        ) : (
                            <div className="space-y-6">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-12">
                                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                                        <p className="text-gray-500">You haven't reviewed any products yet.</p>
                                    </div>
                                ) : (
                                    reviews.map((review) => {
                                        if (!review.product) return null;
                                        return (
                                            <div key={review._id} className="bg-gray-50 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                                                <div className="w-full md:w-32 flex-shrink-0">
                                                    <img
                                                        src={review.product.image}
                                                        alt={review.product.name}
                                                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 text-lg">{review.product.name}</h3>
                                                            <p className="text-sm text-gray-500 mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            {editingReviewId === review._id ? (
                                                                <>
                                                                    <button onClick={() => handleSaveReview(review._id)} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"><Save className="w-4 h-4" /></button>
                                                                    <button onClick={cancelEditingReview} className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"><X className="w-4 h-4" /></button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => startEditingReview(review)} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"><Edit2 className="w-4 h-4" /></button>
                                                                    <button onClick={() => handleDeleteReview(review._id)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {editingReviewId === review._id ? (
                                                        <div className="mt-4 space-y-4">
                                                            <div className="flex space-x-2">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star
                                                                        key={star}
                                                                        className={`w-6 h-6 cursor-pointer ${star <= editForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                                        onClick={() => setEditForm({ ...editForm, rating: star })}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <textarea
                                                                value={editForm.comment}
                                                                onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE45] focus:outline-none"
                                                                rows={3}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-center mt-2 mb-3">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${i < review.rating ? 'fill-[#6DBE45] text-[#6DBE45]' : 'text-gray-300'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p className="text-gray-700 italic">"{review.comment}"</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                        );
                                    })
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
}
