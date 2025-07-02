import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Heart, Star, Eye, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  variants: ProductVariant[];
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const isOutOfStock = selectedVariant.stock === 0;
  const isLowStock = selectedVariant.stock > 0 && selectedVariant.stock <= 5;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        productName: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: product.image
      });
      
      toast({
        title: "Added to cart! ✨",
        description: `${product.name} (${selectedVariant.name}) has been added to your cart.`,
      });
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist 💔" : "Added to wishlist ❤️",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 w-72 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Enhanced Effects */}
      <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-110 ${
              isWishlisted 
                ? 'bg-rose-500/90 text-white' 
                : 'bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-all duration-300 ${
                isWishlisted ? 'fill-current' : ''
              }`}
            />
          </button>
          
          <button className="p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-300 shadow-lg text-slate-600 hover:text-blue-600 hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOutOfStock && (
            <div className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold rounded-full">
              Sold Out
            </div>
          )}
          {!isOutOfStock && isLowStock && (
            <div className="px-2.5 py-1 bg-amber-500/90 backdrop-blur-md text-white text-xs font-semibold rounded-full">
              Only {selectedVariant.stock} left
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-slate-800">4.8</span>
          <span className="text-xs text-slate-500">(127)</span>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-4 space-y-3">
        {/* Product Title & Description */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-slate-900 line-clamp-1 leading-tight group-hover:text-blue-700 transition-colors duration-300">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Enhanced Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
              ${selectedVariant.price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ${(selectedVariant.price * 1.25).toFixed(2)}
            </span>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
              20% OFF
            </span>
          </div>
        </div>

        {/* Enhanced Variant Selector */}
        {product.variants.length > 1 && (
          <div className="space-y-1.5">
            <Select
              value={selectedVariant.id}
              onValueChange={(value) => {
                const variant = product.variants.find(v => v.id === value);
                if (variant) setSelectedVariant(variant);
              }}
            >
              <SelectTrigger className="w-full h-10 text-sm border-slate-200/60 rounded-xl bg-slate-50/50 hover:bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-200/60 shadow-2xl bg-white/95 backdrop-blur-xl">
                {product.variants.map((variant) => (
                  <SelectItem 
                    key={variant.id} 
                    value={variant.id}
                    className="rounded-xl focus:bg-blue-50 focus:text-blue-700 hover:bg-slate-50 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-medium text-sm">{variant.name}</span>
                      <div className="flex items-center gap-3 ml-6">
                        <span className="text-sm font-bold text-slate-800">
                          ${variant.price.toFixed(2)}
                        </span>
                        {variant.stock <= 5 && variant.stock > 0 && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full font-medium">
                            {variant.stock} left
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Enhanced Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full h-10 font-semibold text-sm rounded-xl transition-all duration-300 ${
            isOutOfStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed hover:bg-slate-100 border border-slate-200'
              : 'bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border-0 relative overflow-hidden'
          }`}
        >
          {!isOutOfStock && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          )}
          
          {isOutOfStock ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full" />
              Sold Out
            </div>
          ) : (
            <div className="flex items-center gap-2 relative z-10">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
              <ArrowUpRight className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
            </div>
          )}
        </Button>

        {/* Enhanced Quick Actions */}
        <div className="flex gap-2">
          <button className="flex-1 h-8 border border-slate-200/60 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 backdrop-blur-sm bg-white/50">
            Quick View
          </button>
          <button className="flex-1 h-8 border border-slate-200/60 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 backdrop-blur-sm bg-white/50">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;