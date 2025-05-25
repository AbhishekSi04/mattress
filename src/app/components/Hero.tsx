'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck, Check, Moon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden pt-4 pb-28">
      {/* Elegant background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-[#1aa39a]/10 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-[#2a73af]/10 to-transparent opacity-60"></div>
      </div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-16 top-1/4 w-72 h-72 border border-[#1aa39a]/20 rounded-full"></div>
        <div className="absolute -right-8 top-1/4 w-40 h-40 border border-[#1aa39a]/20 rounded-full"></div>
        <div className="absolute -left-16 bottom-1/4 w-64 h-64 border border-[#2a73af]/20 rounded-full"></div>
        <div className="absolute top-1/2 right-1/2 w-96 h-96 border border-gray-100 rounded-full opacity-40"></div>
      </div>
      
      {/* Fine dot pattern */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #e0f2f1 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: '0.2' }}></div>
      
      <div className="container mx-auto px-4">
        {/* Logo section at the top
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-auto">
            <Image 
              src="/logo.jpg"
              alt="MattressWala Logo" 
              width={250} 
              height={100}
              className="object-contain"
              priority
            />
          </div>
        </div> */}
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content column */}
          <div className="lg:w-1/2 z-10">
            
            {/* Logo above the heading */}
            <div className="flex justify-start mb-6">
              <div className="relative w-48 h-auto">
                {/* <Image 
                  src="/mattresswala-logo.png"
                  alt="MattressWala Logo" 
                  width={180} 
                  height={75}
                  className="object-contain"
                  priority
                /> */}
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-gray-900 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Dream</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-[#1aa39a]/10 -z-10 transform -rotate-1"></span>
              </span> Better. <br/>
              <span className="bg-gradient-to-r from-[#1aa39a] to-[#2a73af] bg-clip-text text-transparent">Live Better.</span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed font-light">
            <span className="font-medium text-[#1aa39a]">MattressWala </span>
            brings you the world&apos;s most advanced sleep system&rsquo; personalized to your unique body and preferences.
            Experience the difference of scientifically optimized rest
            </h2>
            
            {/* Feature highlights in a more elegant layout */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:border-[#1aa39a]/30 transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center text-[#1aa39a] mr-3">
                    <Shield size={18} />
                  </div>
                  <p className="font-medium text-gray-800">Premium Materials</p>
                </div>
                <p className="text-gray-500 text-sm">Ethically sourced, non-toxic, and hypoallergenic</p>
              </div>
              
              <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:border-[#1aa39a]/30 transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center text-[#1aa39a] mr-3">
                    <Moon size={18} />
                  </div>
                  <p className="font-medium text-gray-800">Pressure Relief</p>
                </div>
                <p className="text-gray-500 text-sm">Adaptive support for every sleep position</p>
              </div>
            </div>
            
            {/* CTA buttons with enhanced design */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                href="" 
                className="group flex items-center justify-center bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:from-[#159089] hover:to-[#24659a] transform hover:translate-y-[-2px]"
              >
                Design Your Perfect Mattress
                <ArrowRight className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              
              <Link 
                href="" 
                className="group flex items-center justify-center bg-white text-[#1aa39a] border border-[#1aa39a]/20 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:bg-[#1aa39a]/5 hover:border-[#1aa39a]/30 transform hover:translate-y-[-2px]"
              >
                Find Your Sleep Profile
                <ArrowRight className="ml-2 opacity-0 group-hover:opacity-70 group-hover:translate-x-1 transition-all" size={18} />
              </Link>
            </div>
            
            {/* Enhanced testimonial section */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1aa39a]/5 to-white rounded-2xl shadow-sm border border-[#1aa39a]/10">
              <div className="flex items-center">
                <div className="flex -space-x-4 mr-4">
                  {[1, 2, 3, 4].map((person) => (
                    <div key={person} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                      {/* <Image 
                        src={`/images/person-${person}.jpg`}
                        alt="Customer" 
                        width={40} 
                        height={40}
                        className="object-cover w-full h-full"
                      /> */}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1aa39a]/10 text-[#1aa39a] border-2 border-white text-xs font-medium">
                    +2K
                  </div>
                </div>
                
                <div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">4.9/5</span> from over 12&apos;000+ happy sleepers
                  </p>
                </div>
              </div>
              
              <div className="hidden md:block pl-4 border-l border-gray-200">
                <p className="text-gray-600 text-sm font-medium">&quot;Best purchase I&apos;ve made in years!&quot;</p>
              </div>
            </div>
          </div>
          
          {/* Image column with enhanced visual elements */}
          <div className="lg:w-1/2 z-10">
            <div className="relative">
              {/* Decorative gradient behind mattress */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-[#1aa39a]/10 via-[#22a8a2]/10 to-[#2a73af]/10 blur-md -z-10"></div>
              
              {/* Main image with enhanced frame */}
              <div className="relative p-2 bg-gradient-to-tr from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100">
                <Image 
                  src="/matt.png"
                  alt="Premium mattress for better sleep" 
                  width={650} 
                  height={450} 
                  className="rounded-2xl"
                />
                
                {/* Logo overlay on the mattress image */}
                <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-lg shadow-sm">
                  {/* <Image 
                    src="/mattresswala-logo.png"
                    alt="MattressWala Logo" 
                    width={120} 
                    height={50}
                    className="object-contain"
                  /> */}
                </div>
                
                {/* Floating badge with enhanced design */}
                <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-[#1aa39a]/20 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="mr-4 w-14 h-14 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1aa39a]">10</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Year Warranty</p>
                      <p className="text-gray-500 text-sm">Industry-leading protection</p>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced floating highlight */}
                <div className="absolute top-1/4 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center text-[#1aa39a]">
                      <Check size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Cooling Technology</p>
                      <p className="text-gray-500 text-xs">Temperature regulated</p>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced comfort indicator */}
                <div className="absolute -top-6 right-12 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-3 bg-gray-100 rounded-full mb-2 relative">
                      <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] rounded-full"></div>
                      <div className="absolute top-0 left-[75%] transform -translate-x-1/2 w-5 h-5 bg-white rounded-full border-2 border-[#1aa39a] shadow-md"></div>
                    </div>
                    <p className="text-xs font-medium text-gray-600">Medium-Firm Support</p>
                  </div>
                </div>
                
                {/* New floating element: delivery badge */}
                <div className="absolute -top-4 -left-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center text-[#1aa39a]">
                      <Truck size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
                      <p className="text-gray-500 text-xs">Next-day available</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sleep quality indicator */}
              <div className="absolute bottom-10 left-16 hidden md:block bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1aa39a]/20 to-[#2a73af]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1aa39a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Sleep Quality</p>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-100 rounded-full mr-2 relative">
                        <div className="absolute top-0 left-0 h-full w-[95%] bg-gradient-to-r from-[#1aa39a] to-[#2a73af] rounded-full"></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;