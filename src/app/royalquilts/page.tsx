'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../../lib/cart';
import { ShoppingCart, Search, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import ShoppingCartModal from '../components/ShoppingCartModal';
import QuoteRequestModal from '../components/QuoteRequestModal';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

type ProductCategory = 'Mattress' | 'Bolster' | 'Cushion' | 'Pillow' | 'Quilts' | 'Sheet';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}


export default function RoyalQuiltsPage() {
  const { addItem, items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [searchText, setSearchText] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Show All'>('Show All');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category?: ProductCategory) => {
    try {
      const url = category ? `/api/products?category=${category}` : '/api/products';
      const response = await fetch(url);
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

  const handleCategoryChange = (category: ProductCategory | 'Show All') => {
    setSelectedCategory(category);
    setLoading(true);
    if (category === 'Show All') {
      fetchProducts();
    } else {
      fetchProducts(category);
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(appliedQuery.toLowerCase())
  );

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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/MattresWala.jpg"
                alt="MattressWala Logo"
                className="h-15 max-h-12 w-auto object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-black">
                  Royal Quilts Collection
                </h1>
                <p className="text-gray-700 mt-1 text-sm">Discover our premium collection designed for ultimate comfort and quality</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/products"
                className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-[#00b388] text-[#00b388] rounded-lg font-semibold hover:bg-[#00b388] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Package className="w-5 h-5" />
                <span className="hidden sm:inline">All Products</span>
              </Link>
              
              <button 
                onClick={() => setIsCartModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#00b388] text-white rounded-lg font-semibold hover:bg-[#0aa68f] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>My Cart</span>
                {items.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') setAppliedQuery(searchText); }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b388] focus:border-[#00b388] transition-colors text-gray-700 bg-white"
              />
            </div>
            <button 
              onClick={() => setAppliedQuery(searchText)}
              className="px-6 py-3 bg-[#00b388] text-white rounded-lg font-semibold hover:bg-[#0aa68f] transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pb-6">
            <button
              onClick={() => handleCategoryChange('Show All')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'Show All'
                  ? 'bg-[#00b388] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#00b388] hover:text-[#00b388]'
              }`}
            >
              Show All
            </button>
            <button
              onClick={() => handleCategoryChange('Mattress')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'Mattress'
                  ? 'bg-[#00b388] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#00b388] hover:text-[#00b388]'
              }`}
            >
              Mattress
            </button>
            <button
              onClick={() => handleCategoryChange('Bolster')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'Bolster'
                  ? 'bg-[#00b388] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#00b388] hover:text-[#00b388]'
              }`}
            >
              Bolster
            </button>
            <button
              onClick={() => handleCategoryChange('Cushion')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'Cushion'
                  ? 'bg-[#00b388] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#00b388] hover:text-[#00b388]'
              }`}
            >
              Cushion
            </button>
            <button
              onClick={() => handleCategoryChange('Pillow')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'Pillow'
                  ? 'bg-[#00b388] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#00b388] hover:text-[#00b388]'
              }`}
            >
              Pillow
            </button>
            <button
              onClick={() => handleCategoryChange('Quilts')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'Quilts'
                  ? 'bg-[#00b388] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#00b388] hover:text-[#00b388]'
              }`}
            >
              Quilts
            </button>
            <button
              onClick={() => handleCategoryChange('Sheet')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === 'Sheet'
                  ? 'bg-[#00b388] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#00b388] hover:text-[#00b388]'
              }`}
            >
              Sheet
            </button>
          </div>
        </div>



        {/* Products Slider - 2 Rows */}
        <section className="py-8 mb-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-black">
              {selectedCategory === 'Show All' ? 'ALL PRODUCTS' : `${selectedCategory.toUpperCase()} COLLECTION`}
            </h2>
            <p className="text-gray-700 font-medium">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for</p>
            </div>
          ) : (
            <div className="relative">
              {/* First Row */}
              <div className="mb-6 relative">
                <Swiper
                  modules={[Navigation, A11y]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  navigation={{
                    prevEl: '#slider-row1-prev',
                    nextEl: '#slider-row1-next',
                  }}
                  className="product-slider"
                >
                  {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 2)).map((product) => (
                    <SwiperSlide key={`slider1-${product._id}`}>
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                        {/* Product Image */}
                        <div className="relative h-56 overflow-hidden bg-gray-50">
                          {product.images && product.images.length > 0 ? (
                            <Image
                              src={`/api/images/${product.images[0]}`}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                            </div>
                          )}
                          {product.category && (
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1 bg-[#00b388] text-white rounded-md text-xs font-semibold">
                                {product.category}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-red-500 text-white rounded-md text-xs font-bold">
                              30% OFF
                            </span>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-bold text-[#00b388]">
                              ₹{Math.round(product.price * 0.7).toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </div>

                          {/* Sizes */}
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide font-medium">Available Sizes</p>
                              <div className="flex flex-wrap gap-1.5">
                                {product.sizes.slice(0, 3).map((size, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                                  >
                                    {size}
                                  </span>
                                ))}
                                {product.sizes.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                                    +{product.sizes.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Quantity & Add to Cart */}
                          <div className="mt-auto space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-700">Qty:</span>
                              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                                <button
                                  onClick={() => handleQuantityChange(product._id, Math.max(1, (quantities[product._id] || 1) - 1))}
                                  className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-colors font-bold text-sm"
                                >
                                  −
                                </button>
                                <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                                  {quantities[product._id] || 1}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) + 1)}
                                  className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-colors font-bold text-sm"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full py-2.5 bg-[#00b388] text-white rounded-lg font-semibold hover:bg-[#0aa68f] transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>

                            {messages[product._id] && (
                              <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800 text-xs font-medium text-center">
                                  {messages[product._id]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Buttons Row 1 */}
                <button
                  id="slider-row1-prev"
                  className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:bg-[#00b388] hover:border-[#00b388] hover:scale-110 shadow-lg group"
                >
                  <ChevronLeft className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                </button>
                <button
                  id="slider-row1-next"
                  className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:bg-[#00b388] hover:border-[#00b388] hover:scale-110 shadow-lg group"
                >
                  <ChevronRight className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Second Row */}
              {filteredProducts.length > 1 && (
                <div className="relative">
                  <Swiper
                    modules={[Navigation, A11y]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                      1280: { slidesPerView: 4 },
                    }}
                    navigation={{
                      prevEl: '#slider-row2-prev',
                      nextEl: '#slider-row2-next',
                    }}
                    className="product-slider"
                  >
                    {filteredProducts.slice(Math.ceil(filteredProducts.length / 2)).map((product) => (
                      <SwiperSlide key={`slider2-${product._id}`}>
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                          {/* Product Image */}
                          <div className="relative h-56 overflow-hidden bg-gray-50">
                            {product.images && product.images.length > 0 ? (
                              <Image
                                src={`/api/images/${product.images[0]}`}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                              </div>
                            )}
                            {product.category && (
                              <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 bg-[#00b388] text-white rounded-md text-xs font-semibold">
                                  {product.category}
                                </span>
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 bg-red-500 text-white rounded-md text-xs font-bold">
                                30% OFF
                              </span>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                            
                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-2xl font-bold text-[#00b388]">
                                ₹{Math.round(product.price * 0.7).toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{product.price.toLocaleString()}
                              </span>
                            </div>

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide font-medium">Available Sizes</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {product.sizes.slice(0, 3).map((size, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                  {product.sizes.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                                      +{product.sizes.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Quantity & Add to Cart */}
                            <div className="mt-auto space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-700">Qty:</span>
                                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                                  <button
                                    onClick={() => handleQuantityChange(product._id, Math.max(1, (quantities[product._id] || 1) - 1))}
                                    className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-colors font-bold text-sm"
                                  >
                                    −
                                  </button>
                                  <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                                    {quantities[product._id] || 1}
                                  </span>
                                  <button
                                    onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) + 1)}
                                    className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-colors font-bold text-sm"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full py-2.5 bg-[#00b388] text-white rounded-lg font-semibold hover:bg-[#0aa68f] transition-colors flex items-center justify-center gap-2 text-sm"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </button>

                              {messages[product._id] && (
                                <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-green-800 text-xs font-medium text-center">
                                    {messages[product._id]}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Navigation Buttons Row 2 */}
                  <button
                    id="slider-row2-prev"
                    className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:bg-[#00b388] hover:border-[#00b388] hover:scale-110 shadow-lg group"
                  >
                    <ChevronLeft className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                  </button>
                  <button
                    id="slider-row2-next"
                    className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:bg-[#00b388] hover:border-[#00b388] hover:scale-110 shadow-lg group"
                  >
                    <ChevronRight className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Modals */}
      {isCartModalOpen && (
        <ShoppingCartModal
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
        />
      )}

      {isQuoteModalOpen && (
        <QuoteRequestModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          cartItems={items}
          total={items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
        />
      )}
    </div>
  );
}
