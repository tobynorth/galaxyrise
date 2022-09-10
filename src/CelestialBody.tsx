import { Vector3 } from 'three'

const MAX_RADIUS : number = 0.5

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

export function CelestialBody(props: CelestialBodyProps) : JSX.Element {
  return (
    <mesh
      position={props.coordinates}
      scale={1}>
      <sphereGeometry args={[getRenderRadius(props.radius)]} />
      <meshStandardMaterial color={getRenderColor(props.type)} />
    </mesh>
  )
}

export interface CelestialBodyProps {
  name: string,
  type: string,
  radius: number,
  coordinates: Vector3
};