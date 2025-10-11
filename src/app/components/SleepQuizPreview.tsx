'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, BedDouble, Ruler, Heart, Layers, Plus, Palette } from 'lucide-react';
import Mattress3D from './Mattress3D'

const SleepQuizPreview = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('Queen');
  const [customSize, setCustomSize] = useState({ length: '', width: '', height: '' });
  const [firmness, setFirmness] = useState<number>(3); // 1-5 scale
  const [sleepPosition, setSleepPosition] = useState<string>('');
  const [bodyWeight, setBodyWeight] = useState<string>('');
  const [hasBackIssues, setHasBackIssues] = useState<boolean | null>(null);
  const [backArea, setBackArea] = useState<string>('');
  const [feelsHot, setFeelsHot] = useState<boolean | null>(null);
  const [roomType, setRoomType] = useState<string>('');
  const [coreMaterial, setCoreMaterial] = useState<string>('');
  const [topLayer, setTopLayer] = useState<string>('');
  const [reversible, setReversible] = useState<boolean | null>(null);
  const [removableCover, setRemovableCover] = useState<boolean | null>(null);
  const [antiDustMite, setAntiDustMite] = useState<boolean | null>(null);
  const [colorPreference, setColorPreference] = useState<string>('');
  const [hasBranding, setHasBranding] = useState<boolean | null>(null);

  const handleNextStep = () => {
    if (activeStep < 7) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const steps = [
    { id: 1, title: "Size", icon: <Ruler size={24} /> },
    { id: 2, title: "Comfort", icon: <BedDouble size={24} /> },
    { id: 3, title: "Health", icon: <Heart size={24} /> },
    { id: 4, title: "Materials", icon: <Layers size={24} /> },
    { id: 5, title: "Add-ons", icon: <Plus size={24} /> },
    { id: 6, title: "Aesthetic", icon: <Palette size={24} /> },
    { id: 7, title: "Complete", icon: <CheckCircle size={24} /> }
  ];

  // Quiz question content based on active step
  const quizContent = () => {
    switch(activeStep) {
      case 1:
        return (
          <>
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Choose Your Mattress Size</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Single', 'Double', 'Queen', 'King', 'Custom'].map(size => (
                <div
                  key={size}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedSize === size ? 'ring-2 ring-offset-2 ring-[#1aa39a] scale-105' : 'shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  <div className="bg-gradient-to-br from-[#1aa39a]/10 to-[#2a73af]/10 p-8 h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#1aa39a]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ruler size={32} className="text-[#1aa39a]" />
                      </div>
                      <p className="font-bold text-xl text-gray-800 mb-2">{size}</p>
                      <p className="text-sm text-gray-600">
                        {size === 'Single' && '39" x 75"'}
                        {size === 'Double' && '54" x 75"'}
                        {size === 'Queen' && '60" x 80"'}
                        {size === 'King' && '76" x 80"'}
                        {size === 'Custom' && 'Your dimensions'}
                      </p>
                    </div>
                    {selectedSize === size && (
                      <div className="absolute top-4 right-4 bg-[#1aa39a] text-white p-2 rounded-full">
                        <CheckCircle size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {selectedSize === 'Custom' && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (inches)</label>
                    <input
                      type="number"
                      value={customSize.length}
                      onChange={(e) => setCustomSize({...customSize, length: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g. 80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width (inches)</label>
                    <input
                      type="number"
                      value={customSize.width}
                      onChange={(e) => setCustomSize({...customSize, width: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g. 60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height/Thickness (inches)</label>
                    <input
                      type="number"
                      value={customSize.height}
                      onChange={(e) => setCustomSize({...customSize, height: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g. 10"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Comfort Preferences</h3>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <label className="block text-xl font-medium text-gray-700 mb-6 text-center">Firmness Level</label>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600 flex items-center">
                    <span className="w-4 h-4 bg-blue-200 rounded-full mr-2"></span>
                    Soft
                  </span>
                  <span className="text-sm font-medium text-gray-600 flex items-center">
                    Extra Firm
                    <span className="w-4 h-4 bg-red-200 rounded-full ml-2"></span>
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={firmness}
                  onChange={(e) => setFirmness(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 via-gray-200 to-red-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
                <div className="text-center mt-4">
                  <span className="inline-block px-4 py-2 bg-[#1aa39a] text-white font-medium rounded-full">
                    {['Soft', 'Medium Soft', 'Medium', 'Medium Firm', 'Firm'][firmness - 1]}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-6 text-center">Sleep Position</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Back', icon: '🛏️' },
                    { label: 'Side', icon: '🧘' },
                    { label: 'Stomach', icon: '😴' },
                    { label: 'Combo', icon: '🔄' }
                  ].map(position => (
                    <button
                      key={position.label}
                      onClick={() => setSleepPosition(position.label)}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        sleepPosition === position.label ? 'border-[#1aa39a] bg-[#1aa39a]/10 scale-105' : 'border-gray-200 hover:border-[#1aa39a]/50 bg-white'
                      }`}
                    >
                      <div className="text-3xl mb-2">{position.icon}</div>
                      <div className="font-medium">{position.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-6 text-center">Body Weight Range</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '<50kg', desc: 'Light' },
                    { label: '50–70kg', desc: 'Average' },
                    { label: '70–90kg', desc: 'Heavy' },
                    { label: '90kg+', desc: 'Extra Heavy' }
                  ].map(weight => (
                    <button
                      key={weight.label}
                      onClick={() => setBodyWeight(weight.label)}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        bodyWeight === weight.label ? 'border-[#1aa39a] bg-[#1aa39a]/10 scale-105' : 'border-gray-200 hover:border-[#1aa39a]/50 bg-white'
                      }`}
                    >
                      <div className="text-2xl mb-2">⚖️</div>
                      <div className="font-medium">{weight.label}</div>
                      <div className="text-sm text-gray-500">{weight.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Health & Climate Preferences</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Any back or neck issues?</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setHasBackIssues(true)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      hasBackIssues === true ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setHasBackIssues(false)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      hasBackIssues === false ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    No
                  </button>
                </div>
                {hasBackIssues && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Which area?</label>
                    <select
                      value={backArea}
                      onChange={(e) => setBackArea(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">Select area</option>
                      <option value="Lower Back">Lower Back</option>
                      <option value="Upper Back">Upper Back</option>
                      <option value="Neck">Neck</option>
                      <option value="Shoulders">Shoulders</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Do you feel hot while sleeping?</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setFeelsHot(true)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      feelsHot === true ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setFeelsHot(false)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      feelsHot === false ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Room Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setRoomType('AC')}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      roomType === 'AC' ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    AC
                  </button>
                  <button
                    onClick={() => setRoomType('Non-AC')}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      roomType === 'Non-AC' ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    Non-AC
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Material Preferences</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Core Material</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Memory Foam', 'Latex', 'Spring', 'Hybrid', 'Orthopedic', 'Coir'].map(material => (
                    <button
                      key={material}
                      onClick={() => setCoreMaterial(material)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        coreMaterial === material ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Top Layer</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Knitted Fabric', 'Bamboo', 'Gel', 'Cotton'].map(layer => (
                    <button
                      key={layer}
                      onClick={() => setTopLayer(layer)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        topLayer === layer ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                      }`}
                    >
                      {layer}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Add-ons (Optional)</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Reversible mattress (dual comfort)?</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setReversible(true)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      reversible === true ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setReversible(false)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      reversible === false ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Removable/Washable cover?</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setRemovableCover(true)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      removableCover === true ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setRemovableCover(false)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      removableCover === false ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Anti-dust mite layer?</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setAntiDustMite(true)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      antiDustMite === true ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setAntiDustMite(false)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      antiDustMite === false ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Aesthetic Preferences</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Color/Fabric Preference</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['White', 'Gray', 'Blue', 'Beige'].map(color => (
                    <button
                      key={color}
                      onClick={() => setColorPreference(color)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        colorPreference === color ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">Branding logo/text? (for hotels)</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setHasBranding(true)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      hasBranding === true ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setHasBranding(false)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      hasBranding === false ? 'border-[#1aa39a] bg-[#1aa39a]/10' : 'border-gray-200 hover:border-[#1aa39a]/50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 7:
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Your Custom Mattress Summary</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div><strong>Size:</strong> {selectedSize === 'Custom' ? `${customSize.length}" x ${customSize.width}" x ${customSize.height}"` : selectedSize}</div>
              <div><strong>Firmness:</strong> {['Soft', 'Medium Soft', 'Medium', 'Medium Firm', 'Firm'][firmness - 1]}</div>
              <div><strong>Sleep Position:</strong> {sleepPosition}</div>
              <div><strong>Body Weight:</strong> {bodyWeight}</div>
              <div><strong>Health Considerations:</strong> {hasBackIssues ? `Back issues (${backArea})` : 'None'}</div>
              <div><strong>Temperature:</strong> {feelsHot ? 'Hot sleeper' : 'Cool sleeper'}</div>
              <div><strong>Room:</strong> {roomType}</div>
              <div><strong>Core Material:</strong> {coreMaterial}</div>
              <div><strong>Top Layer:</strong> {topLayer}</div>
              <div><strong>Add-ons:</strong> {[
                reversible && 'Reversible',
                removableCover && 'Removable Cover',
                antiDustMite && 'Anti-dust Mite'
              ].filter(Boolean).join(', ') || 'None'}</div>
              <div><strong>Color:</strong> {colorPreference}</div>
              <div><strong>Branding:</strong> {hasBranding ? 'Yes' : 'No'}</div>
            </div>
            <p className="text-center text-gray-600 mt-6">Ready to build your custom mattress!</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header Section */}
      <div className="flex-shrink-0 text-center py-8 px-4">
        <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-[#1aa39a] text-sm font-medium mb-4">Custom Mattress Builder</span>
        <h2 className="text-4xl font-bold mb-4 text-[#1aa39a]">Design Your Perfect Mattress</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Answer a few questions to create a custom mattress tailored to your needs, preferences, and lifestyle.
        </p>
      </div>

      {/* Main Content - Full Screen Quiz */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4">
        <div className="w-full h-full bg-white backdrop-blur-lg bg-opacity-95 rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="w-full h-full flex flex-col">
            {/* Progress Steps - Full Width */}
            <div className="relative mb-8 flex-shrink-0">
              {/* Progress bar */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] transform -translate-y-1/2 transition-all duration-500"
                style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>

              {/* Step indicators */}
              <div className="relative flex justify-between max-w-4xl mx-auto">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg border-3 z-10 transition-all duration-300 ${
                      step.id < activeStep ? 'bg-gradient-to-br from-[#1aa39a] to-[#2a73af] border-white text-white scale-110' :
                      step.id === activeStep ? 'bg-white border-[#1aa39a] text-[#1aa39a] scale-125 shadow-xl' :
                      'bg-white border-gray-200 text-gray-400'
                    }`}>
                      {step.icon}
                    </div>
                    <span className={`text-sm font-semibold ${
                      step.id === activeStep ? 'text-[#1aa39a]' :
                      step.id < activeStep ? 'text-[#2a73af]' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Content Area - With Live Preview */}
            <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 px-8">
              {/* Main Quiz Content */}
              <div className="flex-1 max-w-2xl">
                {quizContent()}
              </div>

              {/* Live 3D Preview - Shows mattress building in real-time */}
              <div className="flex-shrink-0 w-full lg:w-80">
                <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg border border-white/30">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Your Mattress</h4>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Live Preview</span>
                    </div>
                  </div>

                  {/* Mini 3D Preview */}
                                    {/* Mini 3D Preview */}
                  <div className="relative h-64 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-inner border border-gray-100">
                    {/* Simple mattress representation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative transform scale-100">
                        <Mattress3D
                          size={{
                            length: selectedSize === 'Custom' ? parseInt(customSize.length) || 80 :
                                   selectedSize === 'Single' ? 75 :
                                   selectedSize === 'Double' ? 75 :
                                   selectedSize === 'Queen' ? 80 : 84,
                            width: selectedSize === 'Custom' ? parseInt(customSize.width) || 60 :
                                  selectedSize === 'Single' ? 39 :
                                  selectedSize === 'Double' ? 54 :
                                  selectedSize === 'Queen' ? 60 : 76,
                            height: selectedSize === 'Custom' ? parseInt(customSize.height) || 10 : 10
                          }}
                          layers={activeStep >= 4 ? (coreMaterial ? 3 : 2) : 2}
                          firmness={firmness}
                          color={colorPreference || '#ffffff'}
                          coreMaterial={coreMaterial}
                        />
                      </div>
                    </div>

                    {/* Firmness indicator */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                      {['Soft', 'Med-Soft', 'Medium', 'Med-Firm', 'Firm'][firmness - 1]}
                    </div>
                  </div>

                  {/* Selection Summary */}
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {selectedSize && (
                        <div className="bg-white/60 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500 font-medium">Size</div>
                          <div className="font-bold text-[#1aa39a] text-sm">{selectedSize}</div>
                        </div>
                      )}
                      {sleepPosition && (
                        <div className="bg-white/60 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500 font-medium">Position</div>
                          <div className="font-bold text-[#2a73af] text-sm">{sleepPosition}</div>
                        </div>
                      )}
                    </div>

                    {coreMaterial && (
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">Core Material</span>
                          <span className="font-bold text-sm text-black" style={{
                            color: coreMaterial === 'Memory Foam' ? '#d97706' :
                                   coreMaterial === 'Latex' ? '#ea580c' :
                                   coreMaterial === 'Spring' ? '#374151' :
                                   coreMaterial === 'Hybrid' ? '#7c3aed' :
                                   coreMaterial === 'Orthopedic' ? '#dc2626' :
                                   coreMaterial === 'Coir' ? '#4b5563' : '#6b7280'
                          }}>{coreMaterial}</span>
                        </div>
                      </div>
                    )}

                    {topLayer && (
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">Top Layer</span>
                          <span className="font-bold text-sm" style={{
                            color: topLayer === 'Knitted Fabric' ? '#6b7280' :
                                   topLayer === 'Bamboo' ? '#059669' :
                                   topLayer === 'Gel' ? '#0891b2' :
                                   topLayer === 'Cotton' ? '#d97706' : '#6b7280'
                          }}>{topLayer}</span>
                        </div>
                      </div>
                    )}

                    {colorPreference && (
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">Cover Color</span>
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: colorPreference }}
                            ></div>
                            <span className="font-bold text-sm text-gray-800">{colorPreference}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Add-ons summary */}
                    {(reversible || removableCover || antiDustMite) && (
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="text-xs text-gray-500 font-medium mb-1">Add-ons</div>
                        <div className="flex flex-wrap gap-1">
                          {reversible && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Reversible</span>}
                          {removableCover && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Washable</span>}
                          {antiDustMite && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Anti-mite</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Centered */}
            <div className="flex flex-col items-center justify-center mt-8 flex-shrink-0">
              <p className="text-sm text-gray-500 mb-6 text-center">
                <span className="flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span>Step {activeStep} of {steps.length} • Takes <b>2 minutes</b></span>
                </span>
              </p>
              <div className="flex space-x-6">
                {activeStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-8 py-4 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all transform hover:scale-105"
                  >
                    ← Back
                  </button>
                )}

                {activeStep < 7 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-12 py-4 bg-gradient-to-r from-[#1aa39a] via-[#22a8a2] to-[#2a73af] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center text-lg"
                  >
                    Continue <ArrowRight className="ml-3" size={24} />
                  </button>
                ) : (
                  <Link href="/builder"
                    className="px-12 py-4 bg-gradient-to-r from-[#1aa39a] via-[#22a8a2] to-[#2a73af] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center text-lg"
                  >
                    Build Your Mattress <ArrowRight className="ml-3" size={24} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="flex-shrink-0 py-6 px-4 text-center bg-white/50 backdrop-blur-sm">
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
  );
};

export default SleepQuizPreview;