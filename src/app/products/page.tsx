'use client';

import { useEffect, useState } from 'react';
import ProductCarousel from '../components/ProductCarousel';
import { useCart } from '../../lib/cart';
import QuantitySelector from '../components/QuantitySelector';
import styles from './products.module.css';
import { Heart, ShoppingCart, Search, Filter } from 'lucide-react';
import ShoppingCartModal from '../components/ShoppingCartModal';
import QuoteRequestModal from '../components/QuoteRequestModal';

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
  const { addItem, items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [searchText, setSearchText] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [activeCollectionProduct, setActiveCollectionProduct] = useState(0);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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
        <div className={styles.headerSection}>
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className={styles.logoIcon}>
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={styles.headerTitle}>Product Catalog</h1>
                <p className={styles.headerSubtitle}>Discover our premium mattress collection designed for ultimate comfort and quality sleep</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsCartModalOpen(true)}
              className={styles.cartButton}
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
          
          {/* Search and Filter Bar */}
          <div className="flex gap-4 pb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') setAppliedQuery(searchText); }}
                className={styles.searchInput}
              />
            </div>
            <button 
              onClick={() => setAppliedQuery(searchText)}
              className={styles.searchButton}
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
            <button className={styles.filtersButton}>
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className={`${styles.heroSection} mb-16 relative`}>
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                MAKE THE MOST OUT OF<br />
                <span className={styles.heroAccent}>YOUR SLEEP SPACE</span>
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Discover premium comfort engineered for your perfect rest. Experience luxury 
                sleep solutions crafted with precision and care.
              </p>
            </div>
            
            {/* Feature Icons */}
            <div className="flex flex-wrap gap-8 mt-12">
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">10-Year Warranty</h3>
                  <p className="text-white/80 text-sm">Guaranteed quality and durability for a decade.</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Award-Winning Design</h3>
                  <p className="text-white/80 text-sm">Internationally recognized sleep solutions</p>
                </div>
              </div>
              
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Premium Materials</h3>
                  <p className="text-white/80 text-sm">Eco-friendly, certified, hypoallergenic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Sellers Section */}
        <section className="mb-20 relative">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full opacity-60 -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-50 to-teal-50 rounded-full opacity-50 translate-y-8 -translate-x-8"></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-teal-300 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-20 left-1/4 w-4 h-4 bg-blue-300 rounded-full opacity-40"></div>
            <div className="absolute bottom-20 right-1/4 w-5 h-5 bg-green-300 rounded-full opacity-35"></div>
          </div>

          <div className="mb-12 relative z-10">
            <h2 className={styles.sectionTitle}>BEST SELLERS</h2>
            <p className={styles.sectionSubtitle}>Most popular choices this month</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {filteredProducts.slice(0, 2).map((product) => (
              <div key={product._id} className={styles.bestSellerCard}>
                {/* Image Section */}
                <div className={styles.cardImageSection}>
                  {product.images.length > 0 ? (
                    <div className="relative w-full h-full">
                      <ProductCarousel
                        id={`carousel-${product._id}`}
                        images={product.images.map(id => `/api/images/${id}`)}
                        alt={product.name}
                        showNav={true}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
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
                <div className={styles.cardContentSection}>
                  {/* Header with title and price */}
                  <div className={styles.cardHeader}>
                    <h3 className={styles.productTitle}>{product.name}.</h3>
                    <div className={styles.priceSection}>
                      <span className={styles.currentPrice}>₹{Math.round(product.price * 0.7).toLocaleString()}</span>
                      <span className={styles.originalPrice}>₹{Math.round(product.price).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className={styles.productDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  
                  {/* Available Sizes with discount badge */}
                  <div className={styles.sizesSection}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={styles.sizesLabel}>Available Sizes</p>
                      <span className={styles.discountBadgeSmall}>15% OFF</span>
                    </div>
                    <div className={styles.sizePills}>
                      {product.sizes.map((size, index) => (
                        <button
                          key={size}
                          className={`${styles.sizePill} ${index === 1 ? styles.sizePillSelected : ''}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quantity and Add to Cart */}
                  <div className={styles.actionSection}>
                    <div className={styles.quantitySection}>
                      <QuantitySelector
                        value={quantities[product._id] || 1}
                        onChange={(qty) => handleQuantityChange(product._id, qty)}
                        min={1}
                        max={10}
                      />
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={styles.addToCartButton}
                    >
                      Add to Cart
                    </button>
                  </div>
                  
                  {/* Success Message */}
                  {messages[product._id] && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <p className="text-green-800 text-center text-sm font-medium">{messages[product._id]}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Collection Section */}
        <section className="mb-20 relative">
          {/* Background Decorative Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-teal-100 rounded-full opacity-20"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-blue-100 rounded-full opacity-30"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-100 rounded-full opacity-25"></div>
            <div className="absolute top-1/2 right-10 w-12 h-12 bg-purple-100 rounded-full opacity-20"></div>
            <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-pink-100 rounded-full opacity-25"></div>
            
            {/* Geometric shapes */}
            <div className="absolute top-20 right-1/4 w-8 h-8 bg-teal-200 transform rotate-45 opacity-20"></div>
            <div className="absolute bottom-40 left-20 w-6 h-6 bg-blue-200 transform rotate-12 opacity-30"></div>
            <div className="absolute top-1/3 left-1/3 w-10 h-10 bg-green-200 transform rotate-45 opacity-15"></div>
          </div>

          <div className="mb-12 relative z-10">
            <h2 className={styles.sectionTitle}>OUR COLLECTION</h2>
            <p className={styles.sectionSubtitle}>Carefully curated mattresses designed for every sleeping preference and room size</p>
          </div>
          
          <div className="flex gap-8 relative z-10">
            {/* Left Sidebar Navigation */}
            <div className={styles.collectionSidebar}>
              {filteredProducts.slice(0, 4).map((product, index) => (
                <button 
                  key={product._id} 
                  onClick={() => setActiveCollectionProduct(index)}
                  className={`${styles.sidebarItem} ${index === activeCollectionProduct ? styles.sidebarItemActive : ''}`}
                >
                  <span className={styles.sidebarLabel}>{product.name}.</span>
                  <span className={styles.sidebarSubLabel}>Mattress</span>
                  <span className={styles.sidebarPrice}>
                    ₹{Math.round(product.price * 0.7).toLocaleString()} 
                    <span className={styles.sidebarOriginalPrice}>₹{Math.round(product.price).toLocaleString()}</span>
                  </span>
                </button>
              ))}
              
              {/* Add placeholder items if we have fewer than 4 products */}
              {filteredProducts.length < 4 && Array.from({ length: 4 - filteredProducts.length }).map((_, index) => (
                <div key={`placeholder-${index}`} className={styles.sidebarItem}>
                  <span className={styles.sidebarLabel}>Coming Soon</span>
                  <span className={styles.sidebarSubLabel}>Premium Mattress</span>
                  <span className={styles.sidebarPrice}>₹--,---</span>
                </div>
              ))}
            </div>
            
            {/* Main Product Display */}
            <div className={styles.collectionMain}>
              {filteredProducts.slice(activeCollectionProduct, activeCollectionProduct + 1).map((product) => (
                <div key={`collection-${product._id}`} className={styles.collectionCard}>
                  {/* Left: Image */}
                  <div className={styles.collectionImageSection}>
                    {product.images.length > 0 ? (
                      <div className="relative w-full h-full">
                        <ProductCarousel
                          id={`collection-carousel-${product._id}`}
                          images={product.images.map(id => `/api/images/${id}`)}
                          alt={product.name}
                          showNav={true}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="text-center">
                          <svg className="w-16 h-16 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Right: Details */}
                  <div className={styles.collectionContentSection}>
                    {/* Header */}
                    <div className={styles.collectionHeader}>
                      <h3 className={styles.collectionTitle}>{product.name}.</h3>
                      <div className={styles.collectionPrice}>₹{Math.round(product.price * 0.7).toLocaleString()}</div>
                    </div>
                    
                    {/* Description */}
                    <p className={styles.collectionDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    
                    {/* Available Sizes */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs uppercase tracking-wide text-gray-600 font-medium">Available Sizes</p>
                        <span className={styles.discountBadgeSmall}>15% OFF</span>
                      </div>
                      <div className={styles.collectionSizes}>
                        {product.sizes.map((size, index) => (
                          <button
                            key={size}
                            className={`${styles.collectionSizePill} ${index === 1 ? styles.sizePillSelected : ''}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quantity and Add to Cart */}
                    <div className={styles.collectionActions}>
                      <QuantitySelector
                        value={quantities[product._id] || 1}
                        onChange={(qty) => handleQuantityChange(product._id, qty)}
                        min={1}
                        max={10}
                      />
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={styles.collectionAddToCartButton}
                      >
                        Add to Cart
                      </button>
                    </div>
                    
                    {/* Success Message */}
                    {messages[product._id] && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                        <p className="text-green-800 text-center text-sm font-medium">{messages[product._id]}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Right: Thumbnails */}
                  <div className={styles.collectionThumbnails}>
                    {product.images.slice(0, 3).map((imageId, index) => (
                      <div key={index} className={styles.thumbnailImage}>
                        <img
                          src={`/api/images/${imageId}`}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Horizontal Product Scroll Section */}
          {filteredProducts.length > 1 && (
            <div className="mt-16 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">All Products in Collection</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Scroll to explore</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              <div className={`flex gap-6 overflow-x-auto pb-4 ${styles.horizontalScroll}`} style={{ scrollBehavior: 'smooth' }}>
                {filteredProducts.map((product, index) => (
                  <div key={`horizontal-${product._id}`} className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Product Image with Carousel */}
                    <div className="h-48 bg-gray-50 relative">
                      {product.images.length > 0 ? (
                        <div className="relative w-full h-full">
                          <ProductCarousel
                            id={`horizontal-carousel-${product._id}`}
                            images={product.images.map(id => `/api/images/${id}`)}
                            alt={product.name}
                            showNav={true}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">No Image</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">₹{Math.round(product.price * 0.7).toLocaleString()}</div>
                          <div className="text-sm text-gray-500 line-through">₹{Math.round(product.price).toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        Premium comfort mattress designed for ultimate sleep experience with advanced materials.
                      </p>
                      
                      {/* Sizes */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Available Sizes</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.slice(0, 3).map((size) => (
                            <span key={size} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{product.sizes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <QuantitySelector
                            value={quantities[product._id] || 1}
                            onChange={(qty) => handleQuantityChange(product._id, qty)}
                            min={1}
                            max={10}
                          />
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                      
                      {/* Success Message */}
                      {messages[product._id] && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-3">
                          <p className="text-green-800 text-center text-xs">{messages[product._id]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Lifestyle Inspiration Section */}
        <section className="mb-20">
          <div className="mb-12">
            <h2 className={styles.sectionTitle}>LIFESTYLE INSPIRATION</h2>
            <p className={styles.sectionSubtitle}>Experience the perfect sleep sanctuary</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Modern Comfort - Large Card */}
            <div className={`${styles.lifestyleCard} ${styles.lifestyleLarge} ${styles.modernComfort} md:col-span-2 md:row-span-2`}>
              <div className={styles.lifestyleOverlay}>
                <div className={styles.lifestyleContent}>
                  <h3 className={styles.lifestyleTitle}>Modern Comfort</h3>
                  <p className={styles.lifestyleSubtitle}>Experience luxury in every detail</p>
                </div>
              </div>
            </div>
            
            {/* Premium Quality */}
            <div className={`${styles.lifestyleCard} ${styles.premiumQuality}`}>
              <div className={styles.lifestyleOverlay}>
                <div className={styles.lifestyleContent}>
                  <h3 className={styles.lifestyleTitle}>Premium Quality</h3>
                  <p className={styles.lifestyleSubtitle}>Certified materials</p>
                </div>
              </div>
            </div>
            
            {/* Extra bedroom image */}
            <div className={`${styles.lifestyleCard} ${styles.extraBedroom}`}>
              <div className={styles.lifestyleOverlay}>
                <div className={styles.lifestyleContent}>
                  <h3 className={styles.lifestyleTitle}>Cozy Nights</h3>
                  <p className={styles.lifestyleSubtitle}>Perfect for every space</p>
                </div>
              </div>
            </div>
            
            {/* Happy Customers Count */}
            <div className={`${styles.lifestyleCard} ${styles.happyCustomers} md:col-span-1`}>
              <div className={styles.lifestyleContent}>
                <h3 className={styles.customerCount}>10,000+</h3>
                <p className={styles.customerLabel}>HAPPY CUSTOMERS</p>
              </div>
            </div>
            
            {/* Bottom bedroom image */}
            <div className={`${styles.lifestyleCard} ${styles.bottomBedroom}`}>
              <div className={styles.lifestyleOverlay}>
                <div className={styles.lifestyleContent}>
                  <h3 className={styles.lifestyleTitle}>Sleep Better</h3>
                  <p className={styles.lifestyleSubtitle}>Every night matters</p>
                </div>
              </div>
            </div>
            
            {/* Transform Your Sleep */}
            <div className={`${styles.lifestyleCard} ${styles.transformSleep}`}>
              <div className={styles.lifestyleOverlay}>
                <div className={styles.lifestyleContent}>
                  <h3 className={styles.lifestyleTitle}>Ready to Transform Your Sleep?</h3>
                  <button 
                    onClick={() => setIsQuoteModalOpen(true)}
                    className={styles.requestQuoteButton}
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-20 relative">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute top-10 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-0 left-1/3 w-24 h-24 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Experience Better Sleep?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have transformed their sleep with our premium mattresses. 
                Get personalized recommendations today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Get Free Quote
                </button>
                <button 
                  onClick={() => setIsCartModalOpen(true)}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  View Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Highlight Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our expert team is always ready to help you find the perfect mattress for your needs.</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-gray-600">Enjoy complimentary white-glove delivery and setup service for all our mattresses.</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction guaranteed with our 90-night sleep trial and 10-year warranty.</p>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="mb-20 relative">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 blur-sm"></div>
            <div className="absolute top-1/2 -right-16 w-40 h-40 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-30 blur-sm"></div>
            <div className="absolute -bottom-10 left-1/3 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-30 blur-sm"></div>
          </div>
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real customers have to say about their sleep transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Best sleep I've had in years! The mattress perfectly balances comfort and support. My back pain is completely gone."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Outstanding quality and customer service. The delivery team was professional and the mattress exceeded my expectations."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Mike Chen</p>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Finally found the perfect mattress for couples! No more feeling my partner's movements. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Amanda Davis</p>
                  <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empty State */}
        {filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-[#2dd4bf]/10 to-[#14b8a6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-[#2dd4bf]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0b2633] mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all products.</p>
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-[#2dd4bf]/10 to-[#14b8a6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#2dd4bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0b2633] mb-2">No products available</h3>
            <p className="text-gray-600">Check back soon for our latest mattress collection.</p>
          </div>
        )}
      </div>

      {/* Shopping Cart Modal */}
      <ShoppingCartModal 
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />

      {/* Quote Request Modal */}
      <QuoteRequestModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}