import { useState } from 'react';
import { Lock, ArrowRight, Loader, CheckCircle, Eye, EyeOff } from 'lucide-react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.put(`/users/reset-password/${token}`, { password });
            setSuccess(true);
            setMessage('Password updated successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update password. Token may be invalid or expired.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center border border-[#DFC5FE]/30">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{message || 'Password Reset Successful'}</h2>
                    <p className="text-gray-600 mb-6">Redirecting you to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#DFC5FE]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6DBE45]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-[#DFC5FE]/30">
                <div className="flex flex-col items-center">
                    <img
                        src="/lavantalogo.jpg"
                        alt="Lavanta Naturals"
                        className="w-24 h-24 object-contain mb-4"
                    />
                    <h2 className="mt-2 text-center text-3xl font-serif font-bold text-[#6DBE45]">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Enter your new password below
                    </p>
                </div>
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-200">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6DBE45] focus:border-[#6DBE45] focus:z-10 sm:text-sm"
                                placeholder="New Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 z-20"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full pl-10 pr-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6DBE45] focus:border-[#6DBE45] focus:z-10 sm:text-sm"
                                placeholder="Confirm New Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 z-20"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#6DBE45] hover:bg-[#5da838] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DBE45] transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <ArrowRight className="h-5 w-5 text-[#5da838] group-hover:text-[#4a8a2d]" />
                                    </span>
                                    Set New Password
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
