import { Canvas } from "@react-three/fiber"

export default function App() {
  return (

    <Canvas>
      <mesh>
        <torusGeometry args={[1, 0.5, 16, 32]} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
    </Canvas>

  )
}