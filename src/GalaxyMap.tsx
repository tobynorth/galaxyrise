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
  v.setFromSphericalCoords(v.x < 1 ? 0 : Math.log2(v.x), (-1 * v.y + 90) * Math.PI / 180, (v.z + 90) * Math.PI / 180);
  v.multiplyScalar(1 / LY_PER_UNIT);
  return v;
}

const HexagonalGrid = ({ size = 2, circleCount = 10 }) => {
  let hexagons = [];
  let shift = false;
  for (let row = -size * circleCount; row <= size * circleCount; row+=(size/2)) {
    for (let col = -size * circleCount; col <= size * circleCount; col+=(size/2)) {
      hexagons.push(
        <mesh key={`${row}-${col}`} position={[col+(shift?1:0), 0, row * Math.sqrt(3)]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size/Math.sqrt(3), size/Math.sqrt(3), 6, 1, Math.PI / 6]} />
          <meshBasicMaterial color="gray" wireframe />
        </mesh>
      );
      shift = !shift;
    }
  }

  return <>{hexagons}</>;
};


export default function GalaxyMap() {
  let celestialBodies : CelestialBodyProps[] = data.objects.map(c => {return {...c, coordinates: convertToGridCoords(c.coordinates)}});
  return (
      <Canvas camera={{fov: 25, position: [-40, 15, 30] }} >
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <ambientLight />
          <color attach="background" args={["black"]} />
          <HexagonalGrid size={2} circleCount={7} />
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