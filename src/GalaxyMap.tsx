import React from 'react'
import { Canvas } from '@react-three/fiber'
import CelestialBody from './CelestialBody';
import { OrbitControls } from '@react-three/drei'

export default function GalaxyMap() {
  // Temporary test data
  let celestialBodies = [
    {
      name: "The Sun",
      type: "G2V",
      radius: 1,
      distance: 0,
      galacticLatitude: 0,
      galacticLongitude: 0
    },
    {
      name: "Aldebaran",
      type: "K5+ III",
      radius: 45.1,
      distance: 65.3,
      galacticLatitude: -20.25 * Math.PI / 180,
      galacticLongitude: 180.97 * Math.PI / 180
    },
    // {
    //   name: "Betelgeuse",
    //   type: "M1–M2 Ia–ab",
    //   radius: 764 * 695700,
    //   distance: 548,
    //   galacticLatitude: (7 + 24/60 + 25.4304/3600) * Math.PI / 180,
    //   galacticLongitude: (15 * (5 + 55/60 + 10.30536/3600)) * Math.PI / 180
    // },
    // {
    //   name: "Alpha Centauri A",
    //   type: "G2V",
    //   radius: 1.2234 * 695700,
    //   distance: 4.37,
    //   galacticLatitude: (-60 - 50/60 - 2.3737/3600) * Math.PI / 180,
    //   galacticLongitude: (15 * (14 + 39/60 + 36.494/3600)) * Math.PI / 180
    // },
    // {
    //   name: "Alpha Centauri B",
    //   type: "K1V",
    //   radius: 0.8632 * 695700,
    //   distance: 4.37,
    //   galacticLatitude: (-60 - 50/60 - 15.0992/3600) * Math.PI / 180,
    //   galacticLongitude: (15 * (14 + 39/60 + 35.06311/3600)) * Math.PI / 180
    // },
    // {
    //   name: "Proxima Centauri",
    //   type: "M5.5Ve",
    //   radius: 0.1542 * 695700,
    //   distance: 4.2465,
    //   galacticLatitude: (-62 - 40/60 - 46.1631/3600) * Math.PI / 180,
    //   galacticLongitude: (15 * (14 + 29/60 + 42.94853/3600)) * Math.PI / 180
    // }
  ];
  return (
      <Canvas camera={{fov: 25, position: [0, 50, 40] }} >
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          <ambientLight />
          <color attach="background" args={["black"]} />
          <gridHelper args={[21, 21]} />
          { celestialBodies.map(c => <CelestialBody {...c} key={c.name} />) }
      </Canvas>
  )
}