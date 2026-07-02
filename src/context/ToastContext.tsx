import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    addToast: (type: ToastType, message: string) => void;
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((type: ToastType, message: string) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed top-24 right-5 z-50 flex flex-col space-y-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-center w-full max-w-xs p-4 space-x-4 bg-white divide-x divide-gray-200 rounded-2xl shadow-xl transition-all duration-300 transform translate-x-0 animate-slideIn ${toast.type === 'success' ? 'text-green-800 border border-green-100' : 'text-gray-500'}`}
                        role="alert"
                    >
                        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-xl ${toast.type === 'success' ? 'text-green-500 bg-green-50' :
                            toast.type === 'error' ? 'text-red-500 bg-red-100' :
                                'text-blue-500 bg-blue-100'
                            }`}>
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                            {toast.type === 'info' && <Info className="w-5 h-5" />}
                        </div>
                        <div className={`pl-4 text-sm font-normal ${toast.type === 'success' ? 'text-green-800' : 'text-gray-800'}`}>{toast.message}</div>
                        <button
                            type="button"
                            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                            onClick={() => removeToast(toast.id)}
                            aria-label="Close"
                        >
                            <span className="sr-only">Close</span>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
