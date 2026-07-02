import { useEffect, useState, useRef } from 'react';
import api from '../api';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function VerifyEmailPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('');
    const hasVerified = useRef(false);

    useEffect(() => {
        const verifyEmail = async () => {
            if (hasVerified.current) return;
            hasVerified.current = true;

            try {
                const { data } = await api.get(`/users/verify/${token}`);
                setStatus('success');
                setMessage(data.message);

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Verification failed. Link may be invalid or expired.');
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    {status === 'verifying' && (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6DBE45] mb-4"></div>
                            <h2 className="text-xl font-medium text-gray-900">Verifying your email...</h2>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center animate-fade-in">
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                            <p className="text-gray-600 mb-6">{message}</p>
                            <p className="text-sm text-gray-400">Redirecting to login...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center animate-fade-in">
                            <XCircle className="h-16 w-16 text-red-500 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                            <p className="text-red-500 mb-6">{message}</p>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6DBE45] hover:bg-[#5da838] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DBE45]"
                            >
                                Go to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
