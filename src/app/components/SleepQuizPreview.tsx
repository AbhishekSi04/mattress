import Link from 'next/link';
import React from 'react';

const SleepQuizPreview: React.FC = () => {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Perfect Mattress</h2>
        <p className="text-lg text-gray-600 mb-8">
          Not sure what you need? Our AI-powered sleep quiz will help you discover the perfect mattress for your sleep style.
        </p>
        <div className="bg-white rounded-lg p-8 shadow-md">
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center mb-6">
            <span className="text-gray-500 text-xl">Sleep Quiz Tool</span>
          </div>
          <Link href="/quiz" className="inline-block bg-red-800 text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition duration-300">
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SleepQuizPreview;