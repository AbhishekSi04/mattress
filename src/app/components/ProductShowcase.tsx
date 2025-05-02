import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductShowcase = () => {
  const products = [
    {
      id: 'original',
      name: 'Original Mattress',
      description: 'Our award-winning mattress with perfect balance of comfort and support',
      image: '/images/original-mattress.png',
      price: '₹24,999',
      salePrice: '₹19,999',
      features: ['7-zone back support', 'Temperature regulating', 'Motion isolation']
    },
    {
      id: 'hybrid',
      name: 'Hybrid Mattress',
      description: 'The perfect combination of memory foam comfort and spring support',
      image: '/images/hybrid-mattress.png',
      price: '₹34,999',
      salePrice: '₹27,999',
      features: ['Pocket springs', 'Cooling technology', 'Edge support']
    },
    {
      id: 'luxury',
      name: 'Luxury Mattress',
      description: 'Our premium mattress with advanced cooling and ultimate comfort',
      image: '/images/luxury-mattress.png',
      price: '₹44,999',
      salePrice: '₹36,999',
      features: ['Premium materials', 'Advanced cooling', 'Pressure relief']
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Advanced Sleep Range</h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
          Our sleep scientists understand Indian sleepers well. Over two years of sleep research helped us develop the best mattresses for all Indian climates and body types.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={400} 
                  height={300} 
                  className="w-full"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SALE
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <ul className="mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 line-through mr-2">{product.price}</span>
                  <span className="text-2xl font-bold text-indigo-600">{product.salePrice}</span>
                </div>
                
                <Link 
                  href={`/products/${product.id}`} 
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;