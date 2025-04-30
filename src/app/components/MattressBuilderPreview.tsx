import Link from 'next/link';
import React from 'react';

const MattressBuilderPreview: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Design Your Custom Mattress</h2>
        <p className="text-lg text-gray-600 mb-8">
          Create a mattress that perfectly fits your sleep needs and preferences.
        </p>
        <div className="bg-gray-100 rounded-lg p-8 shadow-md">
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center mb-6">
            <span className="text-gray-500 text-xl">Mattress Builder Tool</span>
          </div>
          <Link href="/builder" className="inline-block bg-blue-900 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-800 transition duration-300">
            Start Building
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MattressBuilderPreview;