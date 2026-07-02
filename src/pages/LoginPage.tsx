import { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/users/login', { email, password });
            login(data);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            setLoading(true);
            const { data } = await api.post('/users/google-login', {
                token: credentialResponse.credential,
            });
            login(data);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Google Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#DFC5FE]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6DBE45]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            {/* Back to Home Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-[#6DBE45] transition-colors z-20 font-medium"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
            </button>

            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-[#DFC5FE]/30">
                <div className="flex flex-col items-center">
                    <img
                        src="/lavantalogo.jpg"
                        alt="Lavanta Naturals"
                        className="w-24 h-24 object-contain mb-4"
                    />
                    <h2 className="mt-2 text-center text-3xl font-serif font-bold text-[#6DBE45]">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Sign in to continue your natural skincare journey
                    </p>
                </div>
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
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
                                placeholder="Password"
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
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <button
                                type="button"
                                onClick={() => navigate('/forgot-password')}
                                className="font-medium text-[#6DBE45] hover:text-[#5da838]"
                            >
                                Forgot your password?
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
                                    Sign in
                                </>
                            )}
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Login Failed')}
                        />
                    </div>

                    <div className="text-center space-y-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/signup')}
                                className="font-medium text-[#6DBE45] hover:text-[#5da838]"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
