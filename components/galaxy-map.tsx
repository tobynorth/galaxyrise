import React from 'react'
import { Canvas } from '@react-three/fiber'
import CelestialBody from './celestial-body';
import { OrbitControls } from '@react-three/drei'

export default function GalaxyMap() {
  // Temporary test data
  let celestialBodies = [
    // The Sun
    {
      name: "Sun",
      distance: 0,
      declination: 0,
      rightAscension: 0
    },
    // Aldebaran (data from Wikipedia)
    {
      name: "Aldebaran",
      distance: 65.3,
      declination: (16 + 30/60 + 33.4885/3600) * Math.PI / 180,
      rightAscension: (15 * (4 + 35/60 + 55.23907/3600)) * Math.PI / 180
    }
  ];
  return (
      <Canvas camera={{fov: 10, position: [0, 0, -100]}}>
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          { celestialBodies.map(c => <CelestialBody {...c} key={c.name} />) }
      </Canvas>
  )
}