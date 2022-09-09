import { useRef } from 'react'
import { Vector3 } from 'three'

interface CelestialBodyProps {
  type: string,
  radius: number,
  distance: number,
  galacticLatitude: number,
  galacticLongitude: number
};

const MAX_RADIUS : number = 0.5
const LY_PER_UNIT : number = 10

let getRenderColor = (type : string): string => {
  // Ignoring class subdivisions (0-9), at least for now
  let spectralClass = type[0];
  switch (spectralClass) {
    case "O":
      return "deepskyblue";
    case "B":
      return "skyblue";
    case "A":
      return "white";
    case "F":
      return "lightyellow";
    case "G":
      return "yellow";
    case "K":
      return "orange";
    case "M":
      return "orangered";
    default:
      return "";
  }
};

let getRenderRadius = (solarRadii: number): number => {
  let scale = 0;
  if (solarRadii < 0.8) {
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

export default function CelestialBody(props: CelestialBodyProps) : JSX.Element {
  const posRef = useRef(new Vector3());
  posRef.current.setFromSphericalCoords(props.distance, (-1 * props.galacticLatitude + 90) * Math.PI / 180, (props.galacticLongitude + 90) * Math.PI / 180);
  posRef.current.multiplyScalar(1 / LY_PER_UNIT);
  posRef.current.round();
  posRef.current.y += 0.5; // by default only centered in cell in 2 dimensions, so center it in 3rd as well
  return (
    <mesh
      position={posRef.current}
      scale={1}>
      <sphereGeometry args={[getRenderRadius(props.radius)]} />
      <meshStandardMaterial color={getRenderColor(props.type)} />
    </mesh>
  )
}