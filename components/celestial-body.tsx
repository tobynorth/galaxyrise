import React, { useState } from 'react'

interface CelestialBodyProps {
  distance: number,
  declination: number,
  rightAscension : number
};

export default function CelestialBody(props: CelestialBodyProps) : JSX.Element {
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  let x = props.distance * Math.cos(props.declination) * Math.cos(props.rightAscension),
    y = props.distance * Math.cos(props.declination) * Math.sin(props.rightAscension),
    z = props.distance * Math.sin(props.declination);
  return (
    <mesh
      position={[x, y, z]}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}