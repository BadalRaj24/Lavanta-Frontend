import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import api from '../api';
import { useCampaign } from '../hooks/useCampaign';

interface CartItem {
    product: any;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => Promise<void>;
    cartCount: number;
    total: number;
    originalTotal: number;
    birthdayDiscount: number;
    loading: boolean;
    getItemUnitPrice: (product: any) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { addToast } = useToast();
    const { isActive: isBirthdayActive, config: campaignConfig } = useCampaign();

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart([]);
        }
    }, [user]);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            const { data } = await api.get('/cart', config);
            // Ensure we filter out any items where product might still be null despite backend fix, just in case
            setCart(data.items.filter((item: any) => item.product) || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product: any, quantity = 1) => {
        if (!user) {
            addToast('info', 'Please login to add items to cart');
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            const { data } = await api.post('/cart/add', { productId: product._id, quantity }, config);
            setCart(data.items || []);
            addToast('success', 'Added to cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
            addToast('error', 'Failed to add to cart');
        }
    };

    const removeFromCart = async (productId: string) => {
        if (!user) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            const { data } = await api.delete(`/cart/remove/${productId}`, config);
            setCart(data.items || []);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (!user) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            const { data } = await api.put('/cart/update', { productId, quantity }, config);
            setCart(data.items || []);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const clearCart = async () => {
        if (!user) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` },
            };
            await api.delete('/cart/clear', config);
            setCart([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    // Calculate effective selling price for cart item
    const getItemUnitPrice = (product: any) => {
        if (!product) return campaignConfig.ORIGINAL_PRICE;
        if (isBirthdayActive) {
            return campaignConfig.CAMPAIGN_PRICE;
        }
        return product.price || campaignConfig.ORIGINAL_PRICE;
    };

    const cartCount = cart.reduce((acc, item) => acc + (item.product ? item.quantity : 0), 0);
    
    // Calculate totals using effective campaign pricing
    const total = cart.reduce((acc, item) => {
        if (!item.product) return acc;
        return acc + getItemUnitPrice(item.product) * item.quantity;
    }, 0);

    const originalTotal = cart.reduce((acc, item) => {
        if (!item.product) return acc;
        return acc + (item.product.originalPrice || campaignConfig.ORIGINAL_PRICE) * item.quantity;
    }, 0);

    const birthdayDiscount = isBirthdayActive ? Math.max(0, originalTotal - total) : 0;

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            total,
            originalTotal,
            birthdayDiscount,
            loading,
            getItemUnitPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
