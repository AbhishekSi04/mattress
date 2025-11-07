'use client';

import { useEffect, useState } from 'react';
import ProductCarousel from '../components/ProductCarousel';
import { useCart } from '../../lib/cart';
import QuantitySelector from '../components/QuantitySelector';
import styles from './products.module.css';
import { Heart, ShoppingCart, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import ShoppingCartModal from '../components/ShoppingCartModal';
import QuoteRequestModal from '../components/QuoteRequestModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

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
              <img
                src="/assets/MattresWala.jpg"
                alt="MattressWala Logo"
                className="h-15 max-h-12 w-auto object-contain"
              />
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
          <div className="flex gap-4 pb-4">
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
          </div>
        </div>

        {/* Hero Banner */}
        <div className={`${styles.heroSection} mb-16 relative`}>
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-10">
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
        <section className="mb-20">
          <div className="mb-12">
            <h2 className={styles.sectionTitle}>BEST SELLERS</h2>
            <p className={styles.sectionSubtitle}>Most popular choices this month</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        <section className="mb-20">
          <div className="mb-12">
            <h2 className={styles.sectionTitle}>OUR COLLECTION</h2>
            <p className={styles.sectionSubtitle}>Carefully curated mattresses designed for every sleeping preference and room size</p>
          </div>
          
          <div className="flex gap-8">
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
          
          
        </section>

        {/* Featured Products Slider - 2 Rows */}
        <section className={`${styles.featuredSliderSection} mb-20`}>
          <div className="mb-12">
            <h2 className={styles.sectionTitle}>FEATURED PRODUCTS</h2>
            <p className={styles.sectionSubtitle}>Explore our complete range of premium mattresses with exclusive deals</p>
          </div>
          
          <div className={styles.sliderContainer}>
            {/* First Row */}
            <div className={styles.sliderRow}>
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
                    prevEl: '#slider-row1-prev',
                    nextEl: '#slider-row1-next',
                  }}
                  className="product-slider"
                >
                  {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 2)).map((product) => (
                    <SwiperSlide key={`slider1-${product._id}`}>
                      <div className={styles.sliderCard}>
                        <div className={styles.sliderCardImage}>
                          <span className={styles.sliderBadge}>30% OFF</span>
                          {product.images.length > 0 ? (
                            <div className={styles.sliderCardImageInner}>
                              <Image
                                src={`/api/images/${product.images[0]}`}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className={styles.sliderCardContent}>
                          <h3 className={styles.sliderCardTitle}>{product.name}</h3>
                          <p className={styles.sliderCardDescription}>
                            Premium comfort mattress designed for ultimate sleep experience with advanced materials and innovative technology.
                          </p>
                          <div className={styles.sliderCardPricing}>
                            <span className={styles.sliderCardPrice}>₹{Math.round(product.price * 0.7).toLocaleString()}</span>
                            <span className={styles.sliderCardOriginalPrice}>₹{Math.round(product.price).toLocaleString()}</span>
                          </div>
                          <div className={styles.sliderCardSizes}>
                            <span className={styles.sliderCardSizesLabel}>Available Sizes</span>
                            <div className={styles.sliderCardSizesPills}>
                              {product.sizes.slice(0, 3).map((size) => (
                                <span key={size} className={styles.sliderCardSizePill}>{size}</span>
                              ))}
                              {product.sizes.length > 3 && (
                                <span className={styles.sliderCardSizePill}>+{product.sizes.length - 3}</span>
                              )}
                            </div>
                          </div>
                          <div className={styles.sliderCardActions}>
                            <div className={styles.sliderCardQuantity}>
                              <QuantitySelector
                                value={quantities[product._id] || 1}
                                onChange={(qty) => handleQuantityChange(product._id, qty)}
                                min={1}
                                max={10}
                              />
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={styles.sliderCardButton}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Add</span>
                            </button>
                          </div>
                          {messages[product._id] && (
                            <div className={styles.sliderSuccessMessage}>
                              <p>{messages[product._id]}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button id="slider-row1-prev" className={`${styles.sliderNavButton} ${styles.sliderNavButtonPrev}`}>
                  <ChevronLeft />
                </button>
                <button id="slider-row1-next" className={`${styles.sliderNavButton} ${styles.sliderNavButtonNext}`}>
                  <ChevronRight />
                </button>
              </div>
            </div>
            {/* Second Row */}
            {filteredProducts.length > Math.ceil(filteredProducts.length / 2) && (
              <div className={styles.sliderRow}>
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
                        <div className={styles.sliderCard}>
                          <div className={styles.sliderCardImage}>
                            <span className={styles.sliderBadge}>30% OFF</span>
                            {product.images.length > 0 ? (
                              <div className={styles.sliderCardImageInner}>
                                <Image
                                  src={`/api/images/${product.images[0]}`}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className={styles.sliderCardContent}>
                            <h3 className={styles.sliderCardTitle}>{product.name}</h3>
                            <p className={styles.sliderCardDescription}>
                              Premium comfort mattress designed for ultimate sleep experience with advanced materials and innovative technology.
                            </p>
                            <div className={styles.sliderCardPricing}>
                              <span className={styles.sliderCardPrice}>₹{Math.round(product.price * 0.7).toLocaleString()}</span>
                              <span className={styles.sliderCardOriginalPrice}>₹{Math.round(product.price).toLocaleString()}</span>
                            </div>
                            <div className={styles.sliderCardSizes}>
                              <span className={styles.sliderCardSizesLabel}>Available Sizes</span>
                              <div className={styles.sliderCardSizesPills}>
                                {product.sizes.slice(0, 3).map((size) => (
                                  <span key={size} className={styles.sliderCardSizePill}>{size}</span>
                                ))}
                                {product.sizes.length > 3 && (
                                  <span className={styles.sliderCardSizePill}>+{product.sizes.length - 3}</span>
                                )}
                              </div>
                            </div>
                            <div className={styles.sliderCardActions}>
                              <div className={styles.sliderCardQuantity}>
                                <QuantitySelector
                                  value={quantities[product._id] || 1}
                                  onChange={(qty) => handleQuantityChange(product._id, qty)}
                                  min={1}
                                  max={10}
                                />
                              </div>
                              <button
                                onClick={() => handleAddToCart(product)}
                                className={styles.sliderCardButton}
                              >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add</span>
                              </button>
                            </div>
                            {messages[product._id] && (
                              <div className={styles.sliderSuccessMessage}>
                                <p>{messages[product._id]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button id="slider-row2-prev" className={`${styles.sliderNavButton} ${styles.sliderNavButtonPrev}`}>
                    <ChevronLeft />
                  </button>
                  <button id="slider-row2-next" className={`${styles.sliderNavButton} ${styles.sliderNavButtonNext}`}>
                    <ChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
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