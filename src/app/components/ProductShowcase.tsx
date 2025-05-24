'use client'
import React, { useState, useEffect } from 'react';
import { Star, Award, Truck, Clock, CheckCircle,} from 'lucide-react';

// Define interfaces for type safety
interface ProductDetails {
  firmness: string;
  height: string;
  materials: string;
  warranty: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: string;
  salePrice: string;
  rating: number;
  reviewCount: number;
  features: string[];
  details: ProductDetails;
}

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [currentReview, setCurrentReview] = useState(0);

  const products = [
    {
      id: 'original',
      name: 'Original',
      category: 'memory-foam',
      description: 'Our award-winning mattress with perfect balance of comfort and support',
      image: '/api/placeholder/400/320',
      price: '₹24,999',
      salePrice: '₹19,999',
      rating: 4.8,
      reviewCount: 320,
      features: ['7-zone back support', 'Temperature regulating', 'Motion isolation'],
      details: {
        firmness: '7/10',
        height: '8 inches',
        materials: 'Memory foam, High-resilience foam',
        warranty: '10 years'
      }
    },
    {
      id: 'hybrid',
      name: 'Hybrid',
      category: 'hybrid',
      description: 'The perfect combination of memory foam comfort and spring support',
      image: '/api/placeholder/400/320',
      price: '₹34,999',
      salePrice: '₹27,999',
      rating: 4.7,
      reviewCount: 247,
      features: ['Pocket springs', 'Cooling technology', 'Edge support'],
      details: {
        firmness: '6/10',
        height: '10 inches',
        materials: 'Memory foam, Pocket springs, Comfort layer',
        warranty: '12 years'
      }
    },
    {
      id: 'luxury',
      name: 'Luxury',
      category: 'luxury',
      description: 'Our premium mattress with advanced cooling and ultimate comfort',
      image: '/api/placeholder/400/320',
      price: '₹44,999',
      salePrice: '₹36,999',
      rating: 4.9,
      reviewCount: 186,
      features: ['Premium materials', 'Advanced cooling', 'Pressure relief'],
      details: {
        firmness: '5/10',
        height: '12 inches',
        materials: 'Gel memory foam, Premium latex, High-density base',
        warranty: '15 years'
      }
    },
    {
      id: 'ortho',
      name: 'Orthopaedic Mattress',
      category: 'specialized',
      description: 'Specially designed to alleviate back pain and provide proper spinal alignment',
      image: '/api/placeholder/400/320',
      price: '₹39,999',
      salePrice: '₹32,999',
      rating: 4.8,
      reviewCount: 154,
      features: ['Posture correction', 'Medical-grade support', 'Pain relief'],
      details: {
        firmness: '8/10',
        height: '9 inches',
        materials: 'Therapeutic foam, Orthopaedic base layer',
        warranty: '12 years'
      }
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      text: "After struggling with back pain for years, the Original Mattress has been a game-changer. I wake up refreshed with no pain!",
      date: "April 2025",
      image: "/api/placeholder/50/50"
    },
    {
      id: 2,
      name: "Rahul Patel",
      rating: 5,
      text: "The Hybrid Mattress offers the perfect balance between support and comfort. It keeps cool even during Mumbai summers!",
      date: "March 2025",
      image: "/api/placeholder/50/50"
    },
    {
      id: 3,
      name: "Ananya Gupta",
      rating: 4,
      text: "Luxury Mattress is worth every rupee. The premium feel and cooling properties make it perfect for year-round comfort.",
      date: "April 2025",
      image: "/api/placeholder/50/50"
    }
  ];

  const toggleCompare = (product: Product) => {
    if (compareList.some(item => item.id === product.id)) {
      setCompareList(compareList.filter(item => item.id !== product.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, product]);
    }
  };

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category === activeTab);

  const nextReview = () => {
    setCurrentReview((currentReview + 1) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentReview]);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < Math.floor(rating) ? "#FFD700" : "none"} 
        stroke={i < Math.floor(rating) ? "#FFD700" : "#D1D5DB"} 
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#1aa39a]">Sleep Better with Science</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our sleep scientists understand Indian sleepers well. Over two years of sleep research 
            helped us develop the best mattresses for all Indian climates and body types.
          </p>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'all' 
                ? 'bg-[#1aa39a] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Mattresses
            </button>
            <button 
              onClick={() => setActiveTab('memory-foam')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'memory-foam' 
                ? 'bg-[#1aa39a] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Memory Foam
            </button>
            <button 
              onClick={() => setActiveTab('hybrid')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'hybrid' 
                ? 'bg-[#1aa39a] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Hybrid
            </button>
            <button 
              onClick={() => setActiveTab('luxury')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'luxury' 
                ? 'bg-[#1aa39a] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Luxury
            </button>
            <button 
              onClick={() => setActiveTab('specialized')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'specialized' 
                ? 'bg-[#1aa39a] text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Specialized
            </button>
          </div>
        </div>

        {/* Compare Products UI */}
        {compareMode && compareList.length > 0 && (
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-indigo-900">Compare Mattresses</h3>
              <button 
                onClick={() => {setCompareMode(false); setCompareList([])}}
                className="text-sm text-[#1aa39a] hover:text-[#2a73af]"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="hidden md:block"></div>
              {compareList.map(product => (
                <div key={product.id} className="text-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-32 h-32 object-cover mx-auto mb-2"
                  />
                  <h4 className="font-bold text-lg">{product.name}</h4>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="font-medium text-gray-700">Price</div>
                {compareList.map(product => (
                  <div key={`${product.id}-price`} className="text-center">
                    <span className="text-[#1aa39a] font-bold">{product.salePrice}</span>
                    <span className="text-gray-400 line-through ml-2 text-sm">{product.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="font-medium text-gray-700">Firmness</div>
                {compareList.map(product => (
                  <div key={`${product.id}-firmness`} className="text-center">
                    {product.details.firmness}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="font-medium text-gray-700">Height</div>
                {compareList.map(product => (
                  <div key={`${product.id}-height`} className="text-center">
                    {product.details.height}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="font-medium text-gray-700">Warranty</div>
                {compareList.map(product => (
                  <div key={`${product.id}-warranty`} className="text-center">
                    {product.details.warranty}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="font-medium text-gray-700">Materials</div>
                {compareList.map(product => (
                  <div key={`${product.id}-materials`} className="text-center">
                    {product.details.materials}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                  SALE
                </div>
                
                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white text-[#1aa39a] rounded-full py-2 px-4 font-medium mx-2 shadow-lg hover:bg-indigo-50 transition-colors"
                  >
                    Quick View
                  </button>
                  <button 
                    onClick={() => toggleCompare(product)}
                    className={`rounded-full py-2 px-4 font-medium mx-2 shadow-lg transition-colors ${
                      compareList.some(item => item.id === product.id)
                      ? 'bg-[#1aa39a] text-white hover:bg-indigo-50'
                      : 'bg-white text-[#1aa39a] hover:bg-indigo-50'
                    }`}
                    disabled={compareList.length >= 3 && !compareList.some(item => item.id === product.id)}
                  >
                    {compareList.some(item => item.id === product.id) ? 'Remove' : 'Compare'}
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-[420px]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 h-[28px] overflow-hidden">{product.name}</h3>
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 h-[48px] line-clamp-2">{product.description}</p>
                
                <ul className="mb-6 h-[96px]">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2 text-gray-700 h-[24px] overflow-hidden">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-gray-400 line-through mr-2">{product.price}</span>
                    <span className="text-2xl font-bold text-[#1aa39a]">{product.salePrice}</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium flex items-center">
                    <Truck size={16} className="mr-1" />
                    Free Delivery
                  </div>
                </div>
                
                <button 
                  className="w-full mt-auto bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white text-center py-3 rounded-lg font-bold transition-colors flex items-center justify-center"
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Compare CTA */}
        {compareList.length > 0 && !compareMode && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white p-4 rounded-xl shadow-2xl flex items-center space-x-4 animate-bounce-slow">
            <div>
              <p className="font-bold">Compare {compareList.length} Products</p>
              <p className="text-xs text-indigo-200">Click to see detailed comparison</p>
            </div>
            <button 
              onClick={() => setCompareMode(true)}
              className="bg-white text-[#1aa39a] px-4 py-2 rounded-lg font-bold hover:bg-indigo-100 transition-colors"
            >
              Compare Now
            </button>
          </div>
        )}
        
        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-screen overflow-y-auto animate-scaleUp">
              <div className="relative">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center">
                        {renderStars(selectedProduct.rating)}
                        <span className="ml-2 text-gray-600">{selectedProduct.rating} ({selectedProduct.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    
                    <div className="flex items-center mb-6">
                      <div className="text-3xl font-bold text-[#1aa39a]mr-3">{selectedProduct.salePrice}</div>
                      <div className="text-gray-400 line-through">{selectedProduct.price}</div>
                      <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        20% OFF
                      </div>
                    </div>
                    
                    <div className="border-t border-b py-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Firmness</span>
                        <span className="font-medium">{selectedProduct.details.firmness}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Height</span>
                        <span className="font-medium">{selectedProduct.details.height}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Materials</span>
                        <span className="font-medium">{selectedProduct.details.materials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Warranty</span>
                        <span className="font-medium">{selectedProduct.details.warranty}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 mb-6">
                      <button className="flex-1 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] hover:from-[#159089] hover:to-[#24659a] text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Buy Now
                      </button>
                      <button className="flex-1 border border-[#1aa39a] text-[#1aa39a] hover:bg-[#1aa39a]/5 font-bold py-3 px-4 rounded-lg transition-colors">
                        Add to Cart
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-green-600">
                        <Truck size={16} className="mr-1" />
                        <span>Free Delivery</span>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <Clock size={16} className="mr-1" />
                        <span>30-Day Trial</span>
                      </div>
                      <div className="flex items-center text-purple-600">
                        <Award size={16} className="mr-1" />
                        <span>{selectedProduct.details.warranty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default ProductShowcase;