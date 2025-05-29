import React from 'react';
import { Star, Moon, Activity, Shield } from 'lucide-react';
import Image from 'next/image';

const SleepExpertise = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-center text-[#1aa39a] mb-3">Designed Purposefully for India</h2>
          <div className="w-24 h-1 bg-[#1aa39a] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Crafted from extensive research to deliver the perfect night&apos;s sleep for Indian sleepers
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="bg-[#1aa39a] absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image 
                src="/dummy.png" 
                alt="Sleep research and development" 
                width={600}
                height={400}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1aa39a] to-transparent p-6">
                <div className="text-white font-medium">1,500+ Indian consumers helped shape our perfect mattress</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-indigo-50 rounded-full p-4 shadow-lg">
              <div className="text-[#1aa39a] font-bold text-xl">2+ Years</div>
              <div className="text-[#1aa39a] text-sm">of Research</div>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                Our sleep scientists understand Indian sleepers well. Over two years of intensive sleep research involving 1,500 consumers helped us develop the ultimate mattress with the optimal balance of firmness and body contouring for all Indian climates and body types.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#1aa39a]">
                  <div className="flex items-center mb-4">
                    <Star className="text-[#1aa39a] h-6 w-6 mr-3" />
                    <h3 className="font-bold text-xl text-gray-900">Climate Adaptive</h3>
                  </div>
                  <p className="text-gray-600">Specially engineered to keep you cool in summer and cozy in winter</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#1aa39a]">
                  <div className="flex items-center mb-4">
                    <Activity className="text-[#1aa39a] h-6 w-6 mr-3" />
                    <h3 className="font-bold text-xl text-gray-900">Orthopedic Support</h3>
                  </div>
                  <p className="text-gray-600">Advanced 7-zone support system ensures perfect spinal alignment</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#2a73af]">
                  <div className="flex items-center mb-4">
                    <Moon className="text-[#1aa39a] h-6 w-6 mr-3" />
                    <h3 className="font-bold text-xl text-gray-900">Motion Isolation</h3>
                  </div>
                  <p className="text-gray-600">Sleep undisturbed even with a restless partner beside you</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#2a73af]">
                  <div className="flex items-center mb-4">
                    <Shield className="text-[#1aa39a] h-6 w-6 mr-3" />
                    <h3 className="font-bold text-xl text-gray-900">Hypoallergenic</h3>
                  </div>
                  <p className="text-gray-600">Anti-microbial and dust-mite resistant materials for healthier sleep</p>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white font-medium py-3 px-8 rounded-lg hover:bg-indigo-50 transition-colors duration-300 flex items-center">
                  Discover Our Sleep Technology
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SleepExpertise;