import React from 'react'

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

let getLogScaleVal = (rawNum : number): number => {
  let absVal = Math.abs(rawNum);
  if (absVal < 1) {
    return 0;
  }
  return Math.round((Math.log10(absVal) + Number.EPSILON) * 100) / 100 * Math.sign(rawNum);
};

export default function CelestialBody(props: CelestialBodyProps) : JSX.Element {
  let scaledDist = getLogScaleVal(props.distance);
  let x = scaledDist * Math.cos(props.declination) * Math.cos(props.rightAscension),
    y = scaledDist * Math.cos(props.declination) * Math.sin(props.rightAscension),
    z = scaledDist * Math.sin(props.declination);
    console.log("x, y, z: " + x + ", " + y + ", " + z)
    console.log("orig dist: " + props.distance + ", scaled dist: " + scaledDist)
    console.log("actual radius: " + getLogScaleVal(props.radius / 1000))
  return (
    <mesh
      position={[x, y, z]}
      scale={1}>
      <sphereGeometry args={[getLogScaleVal(props.radius) / 1000]} />
      <meshStandardMaterial color={getColor(props.type)} />
    </mesh>
  )
}