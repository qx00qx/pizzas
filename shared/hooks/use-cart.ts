import { useEffect } from 'react';
import { useCartStore } from '../store/cart';

export const useCart = () => {
  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem,
    getCartItems,
    addCartItem,
    loading,
  } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, []);

  return {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem,
    addCartItem,
    loading,
  };
};
