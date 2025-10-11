"use client"
import React from 'react'
import CustomMattressBuilder from '@/app/components/CustomMattressBuilder'

const BuilderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1aa39a] mb-4">Custom Mattress Builder</h1>
        <p className="text-gray-600 mb-8">Design your mattress step-by-step. Pick size, layers, firmness, and cover — we’ll compose a preview.</p>
        <CustomMattressBuilder />
      </div>
    </div>
  )
}

export default BuilderPage
