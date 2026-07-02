import React from 'react';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

export default function ChatWithExpertPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-[#F9FAFB] via-white to-[#F0FDF4] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-[#6DBE45]/20"
      >
        <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-12 h-12 text-[#6DBE45]" />
        </div>
        
        <h1 className="font-serif text-3xl font-bold text-gray-800 mb-4">
          Coming Soon
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          We're working hard to bring you a dedicated chat feature where our skincare experts can help you build the perfect routine for your unique skin type. Stay tuned!
        </p>

        <Button 
          onClick={() => navigate(-1)} 
          className="w-full flex items-center justify-center space-x-2 shadow-lg shadow-[#6DBE45]/30 hover:shadow-[#6DBE45]/50 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Go Back</span>
        </Button>
      </motion.div>
    </div>
  );
}
