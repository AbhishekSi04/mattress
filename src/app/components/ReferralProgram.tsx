'use client'
import React, { useState } from 'react';
import { Share2, Copy, Gift, Check, Users, ArrowRight } from 'lucide-react';

const ReferralProgram: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "SLEEP2023";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    alert("Share functionality will be implemented here!");
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium mb-6">
              <Users size={18} />
              <span>Referral Rewards</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Share the gift of better sleep</h2>
            
            <p className="text-lg text-gray-700 mb-8">
              Invite your friends to experience the perfect sleep and earn exclusive rewards for both of you. Our referral program makes sharing the joy of restful nights even more rewarding.
            </p>
            
            <div className="bg-white rounded-xl shadow-xl p-8 relative z-10 border border-gray-100">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Gift className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">How It Works</h3>
                  <ol className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-sm font-medium">1</span>
                      <span className="text-gray-700">Share your unique code with friends</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-sm font-medium">2</span>
                      <span className="text-gray-700">They get 10% off their first purchase</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-sm font-medium">3</span>
                      <span className="text-gray-700">You earn 10% off your next order</span>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <div className="mb-4 text-gray-600 font-medium">Your Unique Referral Code</div>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-mono font-bold text-xl p-4 rounded-l-lg flex-grow text-center">
                    {referralCode}
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="bg-indigo-900 text-white p-4 rounded-r-lg hover:bg-indigo-800 transition-colors duration-300"
                    aria-label="Copy code"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <h3 className="text-3xl font-bold mb-4 text-white">Become a Sleep Ambassador</h3>
              
              <p className="text-indigo-100 mb-8">
                Join our community of sleep enthusiasts who are spreading the word about better sleep. Share your unique experiences and help others transform their sleep quality while earning rewards.
              </p>
              
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-medium">Your Rewards</div>
                  <div className="px-3 py-1 bg-white text-indigo-600 rounded-full text-sm font-bold">Active</div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <div className="text-indigo-600 font-bold text-xl">10%</div>
                  </div>
                  <div className="text-white">
                    <div className="font-medium">Discount Earned</div>
                    <div className="text-sm text-indigo-100">Ready to use on your next order</div>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/2 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-indigo-100 mt-2">
                  <div>5 invites sent</div>
                  <div>3 converted</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleShare}
                  className="flex-1 bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center gap-2"
                >
                  <Share2 className="h-5 w-5" />
                  Share Now
                </button>
                
                <a 
                  href="#track-referrals"
                  className="flex items-center justify-center gap-2 bg-indigo-700 text-white py-3 px-6 rounded-lg hover:bg-indigo-800 transition duration-300"
                >
                  Track Referrals
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgram;