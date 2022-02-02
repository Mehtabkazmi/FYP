import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/soup.png";
import { TextureLoader } from "three";

export function Earth(props) {

  const earthRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <mesh ref={earthRef} position={[0, 0, 2]}>
        <coneGeometry args={[3, 5 , 200 ]} />
        <meshStandardMaterial
          map={props.images}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
}
