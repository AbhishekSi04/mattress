"use client"
import React, { useState } from 'react'
import Image from 'next/image'

type Layer = {
  id: number
  name: string
  firmness: 'Soft' | 'Medium' | 'Firm'
  color?: string
  image?: string
}

const defaultLayers: Layer[] = [
  { id: 1, name: 'Comfort Layer', firmness: 'Soft', color: '#f9fafb', image: '/assets/layer-comfort.svg' },
  { id: 2, name: 'Transition Layer', firmness: 'Medium', color: '#eef2ff', image: '/assets/layer-transition.svg' },
  { id: 3, name: 'Support Core', firmness: 'Firm', color: '#e6fffa', image: '/assets/layer-support.svg' }
]

const sizes = ['Twin', 'Full', 'Queen', 'King']

const CustomMattressBuilder: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>(defaultLayers)
  const [selectedSize, setSelectedSize] = useState('Queen')
  const [coverColor, setCoverColor] = useState('#ffffff')

  const addLayer = () => {
    const nextId = layers.length ? Math.max(...layers.map(l => l.id)) + 1 : 1
    setLayers([...layers, { id: nextId, name: `Layer ${nextId}`, firmness: 'Medium', image: '/assets/layer-placeholder.svg' }])
  }

  const removeLayer = (id: number) => {
    setLayers(layers.filter(l => l.id !== id))
  }

  const updateLayer = (id: number, changes: Partial<Layer>) => {
    setLayers(layers.map(l => l.id === id ? { ...l, ...changes } : l))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1aa39a] to-[#2a73af] bg-clip-text text-transparent mb-4">
            Custom Mattress Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Design your perfect mattress with premium materials, custom sizing, and personalized comfort layers
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-1 space-y-6">
            {/* Size Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-[#1aa39a] rounded-full flex items-center justify-center mr-3">
                  📏
                </span>
                Mattress Size
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      selectedSize === size
                        ? 'border-[#1aa39a] bg-[#1aa39a]/10 scale-105'
                        : 'border-gray-200 hover:border-[#1aa39a]/50 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{size}</div>
                    <div className="text-sm text-gray-500">
                      {size === 'Twin' && '39" × 75"'}
                      {size === 'Full' && '54" × 75"'}
                      {size === 'Queen' && '60" × 80"'}
                      {size === 'King' && '76" × 80"'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cover Customization */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-[#1aa39a] rounded-full flex items-center justify-center mr-3">
                  🎨
                </span>
                Cover Design
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={coverColor}
                      onChange={(e) => setCoverColor(e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">{coverColor.toUpperCase()}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155'].map(color => (
                    <button
                      key={color}
                      onClick={() => setCoverColor(color)}
                      className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Layer Management */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-[#1aa39a] rounded-full flex items-center justify-center mr-3">
                  🏗️
                </span>
                Layer Stack
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {layers.map((layer, index) => (
                  <div key={layer.id} className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-[#1aa39a] text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-gray-800">{layer.name}</div>
                          <div className="text-sm text-gray-500">{layer.firmness}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeLayer(layer.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                    <select
                      value={layer.firmness}
                      onChange={(e) => updateLayer(layer.id, { firmness: e.target.value as 'Soft' | 'Medium' | 'Firm' })}
                      className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#1aa39a] focus:border-transparent"
                    >
                      <option>Soft</option>
                      <option>Medium</option>
                      <option>Firm</option>
                    </select>
                  </div>
                ))}
              </div>
              <button
                onClick={addLayer}
                className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
              >
                ➕ Add Layer
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Live Preview</h3>
                  <p className="text-gray-600">See your custom mattress come to life</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Size: <span className="font-semibold text-[#1aa39a]">{selectedSize}</span>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    💾 Save Design
                  </button>
                </div>
              </div>

              {/* Enhanced Preview */}
              <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-inner border-4 border-white">
                {/* Room Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-green-100 opacity-20"></div>

                {/* Mattress Cover */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-12 w-[85%] h-16 rounded-t-2xl shadow-lg border-2 border-white"
                  style={{ background: coverColor }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-t-2xl"></div>
                </div>

                {/* Layers Stack */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 w-[85%] flex flex-col items-stretch space-y-2">
                  {layers.slice().reverse().map((layer, index) => (
                    <div
                      key={layer.id}
                      className="w-full h-16 rounded-xl flex items-center px-6 shadow-lg border-2 border-white transform hover:scale-105 transition-all duration-300"
                      style={{
                        background: layer.color || '#f8fafc',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <Image
                            src={layer.image || '/assets/layer-placeholder.svg'}
                            alt={layer.name}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 text-lg">{layer.name}</div>
                          <div className="text-sm text-gray-600">{layer.firmness} • Layer {layers.length - index}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl">
                          {layer.firmness === 'Soft' && '🛋️'}
                          {layer.firmness === 'Medium' && '🪑'}
                          {layer.firmness === 'Firm' && '🪨'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating Info Cards */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-sm font-semibold text-gray-800">Total Layers</div>
                  <div className="text-2xl font-bold text-[#1aa39a]">{layers.length}</div>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-sm font-semibold text-gray-800">Estimated Feel</div>
                  <div className="text-lg font-bold text-[#2a73af]">
                    {layers.some(l => l.firmness === 'Firm') && layers.some(l => l.firmness === 'Soft')
                      ? 'Balanced'
                      : layers.every(l => l.firmness === 'Soft')
                      ? 'Ultra Soft'
                      : layers.every(l => l.firmness === 'Firm')
                      ? 'Extra Firm'
                      : 'Medium-Firm'
                    }
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center">
                  🛒 Order Now - $1,299
                </button>
                <button className="px-8 py-4 border-2 border-[#1aa39a] text-[#1aa39a] rounded-xl font-bold text-lg hover:bg-[#1aa39a] hover:text-white transition-all flex items-center">
                  📤 Share Design
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-600 rounded-xl font-bold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center">
                  📄 Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomMattressBuilder
