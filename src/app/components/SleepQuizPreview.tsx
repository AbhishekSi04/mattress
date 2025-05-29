'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sun, Activity, CheckCircle, BedDouble, ThermometerSnowflake, Weight, User } from 'lucide-react';

const SleepQuizPreview = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [hoverOption, setHoverOption] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState(2);

  // Simulated quiz navigation - in real implementation would advance through questions
  const handleNextStep = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    }
  };

  const steps = [
    { id: 1, title: "Sleep Style", icon: <BedDouble size={24} /> },
    { id: 2, title: "Body Type", icon: <User size={24} /> },
    { id: 3, title: "Preferences", icon: <Activity size={24} /> },
    { id: 4, title: "Results", icon: <CheckCircle size={24} /> }
  ];

  // Quiz question content based on active step
  const quizContent = () => {
    switch(activeStep) {
      case 1:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">How do you prefer to sleep?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 1, label: "Side Sleeper", image: "/dummy.png  ", description: "Pressure relief for shoulders & hips" },
                { id: 2, label: "Back Sleeper", image: "/dummy.png", description: "Spinal alignment & support" },
                { id: 3, label: "Stomach Sleeper", image: "/dummy.png", description: "Firm support to prevent sinking" }
              ].map(option => (
                <div 
                  key={option.id}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform ${
                    selectedOption === option.id ? 'ring-2 ring-offset-2 ring-red-600 scale-105' : 
                    hoverOption === option.id ? 'scale-105 shadow-lg' : 'shadow-md'
                  }`}
                  onMouseEnter={() => setHoverOption(option.id)}
                  onMouseLeave={() => setHoverOption(null)}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="bg-gradient-to-br from-[#1aa39a]/10 to-[#2a73af]/10 p-6">
                    <div className="h-32 flex items-center justify-center mb-4">
                      <img src={option.image} alt={option.label} className="rounded-md" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg text-gray-800">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      {selectedOption === option.id && (
                        <div className="bg-red-600 text-white p-2 rounded-full">
                          <CheckCircle size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">What&apos;s your body type?</h3>
            <div className="space-y-4">
              {[
                { id: 1, label: "Petite (under 130 lbs)", icon: <Weight size={20} /> },
                { id: 2, label: "Average (130-230 lbs)", icon: <Weight size={20} /> },
                { id: 3, label: "Full-figured (230+ lbs)", icon: <Weight size={20} /> }
              ].map(option => (
                <div 
                  key={option.id}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                    selectedOption === option.id ? 'bg-red-50 border-2 border-red-500' : 'bg-white border-2 border-gray-100 hover:border-red-200 hover:bg-red-50/30'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className={`p-3 rounded-full ${selectedOption === option.id ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {option.icon}
                  </div>
                  <span className="ml-4 font-medium">{option.label}</span>
                  {selectedOption === option.id && (
                    <CheckCircle size={20} className="ml-auto text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">How do you sleep temperature-wise?</h3>
            <div className="relative h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full my-8">
              <div className="absolute inset-0 flex items-center justify-between px-8 text-white font-medium">
                <span className="flex items-center"><ThermometerSnowflake size={20} className="mr-2" /> Cool</span>
                <span>Neutral</span>
                <span className="flex items-center">Hot <Sun size={20} className="ml-2" /></span>
              </div>
              <div 
                className="absolute cursor-pointer w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center -mt-5 -ml-5"
                style={{ left: '60%', top: '50%' }}
              >
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4">I tend to sleep somewhat warm during the night</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-[#1aa39a] text-sm font-medium mb-4">Sleep Better Tonight</span>
          <h2 className="text-4xl font-bold mb-4 text-[#1aa39a]">Find Your Perfect Mattress</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered sleep quiz analyzes 12+ factors to recommend your ideal mattress with 98% accuracy.
          </p>
        </div>
        
        <div className="bg-white backdrop-blur-lg bg-opacity-90 rounded-2xl p-8 shadow-xl border border-gray-100">
          {/* Progress Steps */}
          <div className="relative mb-12">
            {/* Progress bar */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] transform -translate-y-1/2 transition-all duration-500"
              style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {/* Step indicators */}
            <div className="relative flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md border-2 z-10 transition-all duration-300 ${
                    step.id < activeStep ? 'bg-gradient-to-br from-[#1aa39a] to-[#2a73af] border-white text-white' :
                    step.id === activeStep ? 'bg-white border-[#1aa39a] text-[#1aa39a]' :
                    'bg-white border-gray-200 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    step.id === activeStep ? 'text-[#1aa39a]' : 
                    step.id < activeStep ? 'text-[#2a73af]' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quiz Content Area */}
          <div className="mb-10">
            {quizContent()}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">
              <span className="flex items-center">
                <CheckCircle size={16} className="text-green-500 mr-2" />
                <span>Takes <b>90 seconds</b> • <b>15,000+</b> personalized mattress matches</span>
              </span>
            </p>
            <div className="flex space-x-4">
              {activeStep > 1 && (
                <button 
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              
              {activeStep < 4 ? (
                <button 
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-gradient-to-r from-[#1aa39a] via-[#22a8a2] to-[#2a73af] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  Continue <ArrowRight className="ml-2" size={20} />
                </button>
              ) : (
                <Link href="/quiz" 
                  className="px-8 py-3 bg-gradient-to-r from-[#1aa39a] via-[#22a8a2] to-[#2a73af] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  Take the Full Quiz <ArrowRight className="ml-2" size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="mt-10 text-center">
          <div className="flex justify-center space-x-1 mb-2">
            {[1,2,3,4,5].map(star => (
              <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-600"><b>4.9/5</b> from <b>2,300+</b> happy sleepers</p>
        </div>
      </div>
    </div>
  );
};

export default SleepQuizPreview;