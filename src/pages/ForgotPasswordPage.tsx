import { useState } from 'react';
import { Mail, ArrowRight, Loader, ArrowLeft } from 'lucide-react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            await api.post('/users/forgot-password', { email });
            setMessage('Email sent! Please check your inbox for the reset link.');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Enter your email to receive a reset link
                    </p>
                </div>
                {message && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center border border-green-200">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-200">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6DBE45] focus:border-[#6DBE45] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || !!message} // Disable if already sent successfully
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#6DBE45] hover:bg-[#5da838] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DBE45] transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <ArrowRight className="h-5 w-5 text-[#5da838] group-hover:text-[#4a8a2d]" />
                                    </span>
                                    Send Reset Link
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center w-full text-sm font-medium text-gray-600 hover:text-[#6DBE45] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
