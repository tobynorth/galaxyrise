import React from 'react'
import { Canvas } from '@react-three/fiber'
import { CelestialBody, CelestialBodyProps } from './CelestialBody';
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import data from './celestialBodies.json'

const LY_PER_UNIT : number = 3
const MAX_HORIZ_UNITS_FROM_ORIGIN : number = 10
const MAX_VERT_UNITS_FROM_ORIGIN : number = 5
const Y_OFFSET: number = 0.5

let convertToGridCoords = (coords: number[]) : Vector3 => {
  let v = new Vector3(...coords);
  v.setFromSphericalCoords(v.x, (-1 * v.y + 90) * Math.PI / 180, (v.z + 90) * Math.PI / 180);
  v.multiplyScalar(1 / LY_PER_UNIT);
  v.round();
  v.y += Y_OFFSET; // by default only centered in cell in 2 dimensions, so center it in 3rd as well
  return v;
}

export default function GalaxyMap() {
  let celestialBodies : CelestialBodyProps[] = data.objects.map(c => {return {...c, coordinates: convertToGridCoords(c.coordinates)}});
  let gridSize = MAX_HORIZ_UNITS_FROM_ORIGIN * 2 + 1;
  return (
      <Canvas camera={{fov: 25, position: [0, 50, 40] }} >
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          <ambientLight />
          <color attach="background" args={["black"]} />
          <gridHelper args={[gridSize, gridSize]} />
          { celestialBodies
            .filter(c =>
              c.enabled &&
              c.coordinates.x >= -MAX_HORIZ_UNITS_FROM_ORIGIN &&
              c.coordinates.x <= MAX_HORIZ_UNITS_FROM_ORIGIN &&
              c.coordinates.y >= Y_OFFSET - MAX_VERT_UNITS_FROM_ORIGIN &&
              c.coordinates.y <= MAX_VERT_UNITS_FROM_ORIGIN + Y_OFFSET &&
              c.coordinates.z >= -MAX_HORIZ_UNITS_FROM_ORIGIN &&
              c.coordinates.z <= MAX_HORIZ_UNITS_FROM_ORIGIN)
            .map(c => <CelestialBody {...c} key={c.name} />) }
      </Canvas>
  )
}