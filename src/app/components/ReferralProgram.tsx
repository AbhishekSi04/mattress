'use client'
import React from 'react';

const ReferralProgram: React.FC = () => {
  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    alert("Share functionality will be implemented here!");
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-blue-900 to-red-800 rounded-lg p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Invite Friends & Earn Discounts</h3>
          <p className="mb-6">
            Share your unique code with friends and family. When they make their first purchase, 
            you'll both receive 10% off your next order!
          </p>
          <div className="bg-white bg-opacity-20 rounded-md p-3 mb-6 text-center">
            <span className="font-mono font-bold">Your Code: SLEEP2023</span>
          </div>
          <button 
            onClick={handleShare}
            className="w-full bg-white text-blue-900 font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-300"
          >
            Share Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;