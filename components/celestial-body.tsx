import React, { useState } from 'react'

export default function CelestialBody(props: JSX.IntrinsicElements['mesh']) {
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  return (
    <mesh
      {...props}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}