import React from 'react'
import { Canvas } from '@react-three/fiber'
import CelestialBody from './celestial-body';

export default function GalaxyMap() {
  return (
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CelestialBody position={[-1.2, 0, 0]} />
        <CelestialBody position={[1.2, 0, 0]} />
    </Canvas>
  )
}