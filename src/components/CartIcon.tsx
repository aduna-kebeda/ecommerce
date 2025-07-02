
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartIcon: React.FC = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-slate-700" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-5">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
