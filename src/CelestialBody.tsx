import { useState } from 'react';
import { Vector3 } from 'three'

const MAX_RADIUS : number = 0.5

let getRenderColor = (type : string): string => {
  switch (type) {
    case "Black Hole":
      return "black";
    case "Neutron Star":
      return "white";
    case "Nebula":
      return "purple";
  }

  // Ignoring class subdivisions (0-9), at least for now
  let spectralClass = type[0];
  switch (spectralClass) {
    case "O":
      return "deepskyblue";
    case "B":
      return "skyblue";
    case "A":
    case "D":
      return "white";
    case "F":
      return "lightyellow";
    case "G":
      return "yellow";
    case "K":
      return "orange";
    case "M":
      return "orangered";
    case "L":
    case "T":
      return "saddlebrown";
    case "C":
      return "red";
    default:
      return "white";
  }
};

let getRenderRadius = (solarRadii: number): number => {
  let scale = 0;
  if (solarRadii < 0.05) {
    // tiny (white dwarf/neutron star)
    scale = 0.125;
  } else if (solarRadii < 0.8) {
    // small (red/orange dwarf)
    scale = 0.25;
  } else if (solarRadii < 10) {
    // medium (approximately Sun-sized)
    scale = 0.5;
  } else if (solarRadii < 100) {
    // large (giant)
    scale = 0.75;
  } else {
    // huge (super/hypergiant)
    scale = 1;
  }
  return MAX_RADIUS * scale;
}

export function CelestialBody(props: CelestialBodyProps) : JSX.Element {
  const [hovered, hover] = useState(false)

  
  if (hovered) {
    let txt = document.createElement("div");
    txt.id = "hover_label"
    txt.style.position = "absolute";
    txt.style.color = "white"
    txt.innerHTML = `${props.name} (${props.coordinates.y.toFixed(2)})`;
    txt.style.top = 200 + "px";
    txt.style.left = 200 + "px";
    document.body.appendChild(txt);
  } else {
    document.getElementById("hover_label")?.remove();
  }
  
  return (
    <mesh
      position={[props.coordinates.x, 0, props.coordinates.z]}
      scale={1}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <sphereGeometry args={[getRenderRadius(props.radius)]} />
      <meshStandardMaterial color={getRenderColor(props.type)} />
    </mesh>
  )
}

export interface CelestialBodyProps {
  name: string,
  type: string,
  radius: number,
  coordinates: Vector3,
  enabled: boolean
};