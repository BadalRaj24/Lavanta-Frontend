import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F8F8F8] flex items-center justify-center px-4">
            <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center">
                <div className="w-24 h-24 bg-[#6DBE45]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-[#6DBE45]" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for choosing Lavanta. Your order has been confirmed and will be shipped soon.
                </p>
                <button
                    onClick={() => navigate('/products')}
                    className="w-full bg-[#6DBE45] text-white py-3 rounded-xl font-medium hover:bg-[#5da838] transition-colors shadow-lg"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}
