import ProductCard from '@/components/ProductCard';
import CartIcon from '@/components/CartIcon';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  // Test data for the product card
  const sampleProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      variants: [
        { id: 'black', name: 'Midnight Black', price: 299.99, stock: 12 },
        { id: 'white', name: 'Pearl White', price: 299.99, stock: 3 },
        { id: 'blue', name: 'Ocean Blue', price: 319.99, stock: 0 },
        { id: 'red', name: 'Crimson Red', price: 329.99, stock: 8 }
      ]
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Track your health and fitness with this advanced smartwatch featuring GPS and heart rate monitoring.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      variants: [
        { id: 'silver', name: 'Silver Sport', price: 399.99, stock: 5 },
        { id: 'gold', name: 'Gold Edition', price: 449.99, stock: 2 },
        { id: 'black', name: 'Space Black', price: 399.99, stock: 0 }
      ]
    },
    {
      id: '3',
      name: 'Minimalist Desk Lamp',
      description: 'Modern LED desk lamp with adjustable brightness and wireless charging base.',
      image: '/aduna.jpg',
      variants: [
        { id: 'white', name: 'Arctic White', price: 89.99, stock: 15 },
        { id: 'black', name: 'Carbon Black', price: 89.99, stock: 7 }
      ]
    }
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Header with Cart */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Premium Store</h1>
              <p className="text-sm text-slate-500">Curated products for you</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 hover:bg-slate-100 rounded-full transition-colors duration-200">
                <CartIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated selection of premium products designed to enhance your lifestyle with exceptional quality and innovative design.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/30 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Premium Shopping Experience</h3>
              <p className="text-sm text-slate-500">
                Built with modern technology • React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default Index;
