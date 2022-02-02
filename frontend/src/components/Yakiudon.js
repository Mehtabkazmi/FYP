
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Yakiudon.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={0.17}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[3.97, 0, 0]} rotation={[-Math.PI / 2, 0, 2.83]} scale={[100, 100, 100]}>
              <group position={[-0.04, 0, 0]}>
                <mesh
                  geometry={nodes.Yakisoba_Yakisoba_food_0.geometry}
                  material={nodes.Yakisoba_Yakisoba_food_0.material}
                />
                <mesh
                  geometry={nodes.Yakisoba_Yakisoba_food_0_1.geometry}
                  material={nodes.Yakisoba_Yakisoba_food_0_1.material}
                />
                <mesh
                  geometry={nodes.Yakisoba_Yakisoba_food_0_2.geometry}
                  material={nodes.Yakisoba_Yakisoba_food_0_2.material}
                />
                <mesh
                  geometry={nodes.Yakisoba_Yakisoba_food_0_3.geometry}
                  material={nodes.Yakisoba_Yakisoba_food_0_3.material}
                />
              </group>
              <group position={[-0.04, 0, 0]}>
                <mesh geometry={nodes.Yakisoba_Oil_Yakisoba_Oil_0.geometry} material={materials.Yakisoba_Oil} />
              </group>
              <mesh geometry={nodes.Fried_Noodle_Yakisoba_Ceramic_0.geometry} material={materials.Yakisoba_Ceramic} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Yakiudon.gltf')
