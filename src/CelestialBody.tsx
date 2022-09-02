import { useRef } from 'react'
import { Vector3 } from 'three'

interface CelestialBodyProps {
  type: string,
  radius: number,
  distance: number,
  declination: number,
  rightAscension : number
};

let getColor = (type : string): string => {
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

export default function CelestialBody(props: CelestialBodyProps) : JSX.Element {
  const posRef = useRef(new Vector3());
  posRef.current.setFromSphericalCoords(props.distance, props.declination, props.rightAscension);
  return (
    <mesh
      position={posRef.current}
      scale={1}>
      <sphereGeometry args={[props.radius]} />
      <meshStandardMaterial color={getColor(props.type)} />
    </mesh>
  )
}