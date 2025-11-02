'use client';

import { useEffect, useState } from 'react';
import ProductCarousel from '../components/ProductCarousel';
import { useCart } from '../../lib/cart';
import QuantitySelector from '../components/QuantitySelector';

interface Product {
  _id: string;
  name: string;
  price: number;
  sizes: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId: string, qty: number) => {
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product._id] || 1;
    addItem(product._id, qty, {
      title: product.name,
      price: product.price,
      imageUrls: product.images.map(id => `/api/images/${id}`),
    });
    setMessages(prev => ({ ...prev, [product._id]: `${qty} ${product.name} added to cart!` }));
    setTimeout(() => {
      setMessages(prev => ({ ...prev, [product._id]: '' }));
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1aa39a] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#1aa39a]/5 to-[#2a73af]/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-[#2a73af]/5 to-[#1aa39a]/5 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-[#1aa39a]/3 to-[#2a73af]/3 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-[#2a73af]/4 to-[#1aa39a]/4 rounded-full blur-xl animate-pulse delay-1500"></div>

        {/* Additional Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-[#1aa39a]/8 to-[#2a73af]/8 rounded-full blur-md animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/5 w-20 h-20 bg-gradient-to-r from-[#2a73af]/6 to-[#1aa39a]/6 rounded-full blur-lg animate-pulse delay-2000"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-[#1aa39a]/20 rounded-full"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-[#2a73af]/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-[#1aa39a]/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#2a73af]/20 rounded-full"></div>
        <div className="absolute top-3/4 left-2/3 w-1.5 h-1.5 bg-[#1aa39a]/25 rounded-full"></div>
        <div className="absolute bottom-1/2 right-1/6 w-2.5 h-2.5 bg-[#2a73af]/15 rounded-full"></div>

        {/* Subtle Wave Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <pattern id="waves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 Q5,5 10,10 T20,10 V20 H0 Z" fill="#1aa39a"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#1aa39a]/2 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#2a73af]/2 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 relative">
            {/* Blue Accent Div */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-r from-[#2a73af]/30 to-[#1aa39a]/30 rounded-full blur-xl animate-pulse"></div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1aa39a] to-[#2a73af] bg-clip-text text-transparent mb-4 relative z-10">
              Product Catalog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto relative z-10">
              Discover our premium mattress collection designed for ultimate comfort and quality sleep
            </p>

            {/* Decorative Blue Line */}
            <div className="mt-6 mx-auto w-32 h-1.5 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] rounded-full relative z-10 shadow-sm"></div>
          </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] group"
            >
              {/* Image Section */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative overflow-hidden">
                {product.images.length > 0 ? (
                  <div className="relative h-64">
                    <ProductCarousel
                      images={product.images.map(id => `/api/images/${id}`)}
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-black mb-2 line-clamp-2">{product.name}</h2>
                  <p className="text-3xl font-bold text-black mb-3">₹{Math.round(product.price)}</p>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-black mb-3">Available Sizes:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-2 bg-gradient-to-r from-[#1aa39a]/10 to-[#2a73af]/10 text-black text-sm font-medium rounded-lg border border-[#1aa39a]/20"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-black mb-3">Quantity</label>
                  <QuantitySelector
                    value={quantities[product._id] || 1}
                    onChange={(qty) => handleQuantityChange(product._id, qty)}
                    min={1}
                    max={10}
                  />
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white py-4 px-6 rounded-xl font-bold transition-all duration-200 hover:from-[#159089] hover:to-[#24659a] hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] mb-3"
                >
                  Add to Cart
                </button>

                {/* Success Message */}
                {messages[product._id] && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <p className="text-green-800 text-center text-sm font-medium">{messages[product._id]}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-[#1aa39a]/10 to-[#2a73af]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#1aa39a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">No products available</h3>
            <p className="text-gray-600">Check back soon for our latest mattress collection.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}