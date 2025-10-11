'use client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

interface Mattress3DProps {
  size: { length: number; width: number; height: number }
  layers: number
  firmness?: number
  color: string
  coreMaterial: string
}

function MattressModel({ size, layers, color, coreMaterial }: Omit<Mattress3DProps, 'firmness'>) {
  const mattressHeight = size.height / 10 // Convert to reasonable 3D scale
  const layerHeight = mattressHeight / (layers + 1) // Base + layers
  const baseHeight = layerHeight

  const getMaterialColor = (material: string) => {
    switch (material) {
      case 'Memory Foam': return '#8B4513'
      case 'Latex': return '#DAA520'
      case 'Spring': return '#C0C0C0'
      case 'Hybrid': return '#708090'
      case 'Orthopedic': return '#2F4F4F'
      case 'Coir': return '#8B4513'
      default: return '#F5F5DC'
    }
  }

  return (
    <group>
      {/* Base platform */}
      <mesh position={[0, -baseHeight/2, 0]}>
        <boxGeometry args={[size.width/10, baseHeight, size.length/10]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Mattress layers */}
      {Array.from({ length: layers }, (_, i) => (
        <mesh key={i} position={[0, (i + 1) * layerHeight - mattressHeight/2, 0]}>
          <boxGeometry args={[size.width/10, layerHeight, size.length/10]} />
          <meshStandardMaterial
            color={i === layers - 1 ? color : getMaterialColor(coreMaterial)}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Cover */}
      <mesh position={[0, mattressHeight/2 + layerHeight/2, 0]}>
        <boxGeometry args={[size.width/10 + 0.1, 0.1, size.length/10 + 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <Text
        position={[size.width/20 + 0.5, 0, 0]}
        fontSize={0.3}
        color="black"
        anchorX="left"
        anchorY="middle"
      >
        {size.width}&quot;
      </Text>
      <Text
        position={[0, 0, size.length/20 + 0.5]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {size.length}&quot;
      </Text>
      <Text
        position={[0, mattressHeight/2 + 0.5, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="bottom"
      >
        {size.height}&quot;
      </Text>
    </group>
  )
}

export default function Mattress3D({ size, layers, color, coreMaterial }: Mattress3DProps) {
  const defaultSize = { length: 80, width: 60, height: 10 }
  const currentSize = size.length && size.width && size.height ? size : defaultSize

  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [20, 15, 20], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} />

          <MattressModel
            size={currentSize}
            layers={layers}
            color={color}
            coreMaterial={coreMaterial}
          />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={15}
            maxDistance={40}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}