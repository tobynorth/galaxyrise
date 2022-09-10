import React from 'react'
import { Canvas } from '@react-three/fiber'
import { CelestialBody, CelestialBodyProps } from './CelestialBody';
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

const LY_PER_UNIT : number = 3

let convertToGridCoords = (position: Vector3) : Vector3 => {
  position.setFromSphericalCoords(position.x, (-1 * position.y + 90) * Math.PI / 180, (position.z + 90) * Math.PI / 180);
  position.multiplyScalar(1 / LY_PER_UNIT);
  position.round();
  position.y += 0.5; // by default only centered in cell in 2 dimensions, so center it in 3rd as well
  return position;
}

export default function GalaxyMap() {
  // Temporary test data
  let celestialBodies : CelestialBodyProps[] = [
    {
      name: "The Sun",
      type: "G2V",
      radius: 1,
      coordinates: new Vector3(0, 0, 0)
    },
    {
      name: "Aldebaran",
      type: "K5+ III",
      radius: 45.1,
      coordinates: new Vector3(65.3, -20.25, 180.97)
    },
    {
      name: "Betelgeuse",
      type: "M1–M2 Ia–ab",
      radius: 764,
      coordinates: new Vector3(548, -8.96, 199.79)
    },
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
          { celestialBodies.map(c => <CelestialBody {...{...c, coordinates: convertToGridCoords(c.coordinates)}} key={c.name} />) }
      </Canvas>
  )
}