import React from 'react'
import { Canvas } from '@react-three/fiber'
import CelestialBody from './celestial-body';
import { OrbitControls } from '@react-three/drei'

export default function GalaxyMap() {
  return (
      <Canvas camera={{fov: 10, position: [0, 0, -100]}}>
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <CelestialBody position={[-10.2, 2, -30]} />
          <CelestialBody position={[0, 0, 0]} />
      </Canvas>
  )
}