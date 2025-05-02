import React from 'react';
import Image from 'next/image';

const SleepExpertise = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image 
              src="/images/sleep-research.jpg" 
              alt="Sleep research and development" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-6">Designed Purposefully for India</h2>
            <p className="text-lg mb-6">
              Our sleep scientists understand Indian sleepers well. Over two years of sleep research involving 1,500 consumers helped us to develop the best mattress that gives the optimal balance of firmness and body contouring for all Indian climates and body types.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-indigo-600 font-bold text-xl mb-2">Climate Adaptive</div>
                <p>Designed to keep you cool in summer and comfortable in winter</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-indigo-600 font-bold text-xl mb-2">Orthopedic Support</div>
                <p>7-zone support system for proper spinal alignment</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-indigo-600 font-bold text-xl mb-2">Motion Isolation</div>
                <p>Sleep undisturbed even with a restless partner</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-indigo-600 font-bold text-xl mb-2">Hypoallergenic</div>
                <p>Anti-microbial and dust-mite resistant materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SleepExpertise;