import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hit snooze! Sleep is about to get wayyy better.
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6">
            Find the perfect mattress for you
          </h2>
          <p className="text-lg mb-8">
            Awaken your best with our scientifically designed mattresses!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/mattress-builder" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors"
            >
              Build Your Mattress
            </Link>
            <Link 
              href="/sleep-quiz" 
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors"
            >
              Take Sleep Quiz
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <Image 
              src="/images/hero-mattress.png" 
              alt="Premium mattress for better sleep" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 font-bold">4.8/5</span>
              </div>
              <p className="text-sm mt-1">Based on 10,000+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;