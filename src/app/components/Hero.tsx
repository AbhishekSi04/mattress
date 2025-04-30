import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-red-800 to-yellow-500 h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Craft Your Perfect Sleep
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Handcrafted Comfort | Custom Design | Smart Sleep
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/builder" className="bg-white text-blue-900 font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-300 text-lg">
            Start Building
          </Link>
          <Link href="/quiz" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:bg-opacity-10 transition duration-300 text-lg">
            Take Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;