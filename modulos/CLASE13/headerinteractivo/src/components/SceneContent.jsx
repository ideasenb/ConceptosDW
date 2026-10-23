import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useAnimations } from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

function AnimatedModel() {
    const modelRef = useRef()
    const fbx = useLoader(FBXLoader, '/models/WavingGesture.fbx')

    const { animations } = fbx
    const { actions } = useAnimations(animations, modelRef)

    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        if (animations && animations.length > 0) {
            const action = actions[animations[0].name]
            if (action) action.reset().fadeIn(0.5).play()
        }
    }, [actions, animations])

    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    return (
        <group ref={modelRef}>
            <primitive
                object={fbx}
                scale={0.02} // Ajusta la escala según tu modelo de Blender/Mixamo
                position={[1.5, -2, 0]} // Centrar el modelo en la escena
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
                onPointerOut={() => setHovered(false)}
            />
        </group>
    )
}

//Cubo
export default function SceneContent() {
    const cubeRef = useRef()

    useFrame((_, delta) => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += delta * 0.5
            cubeRef.current.rotation.y += delta * 0.8
        }
    })

    return (
        <>
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
            <pointLight position={[-5, 5, -5]} intensity={0.5} />
            <React.Suspense fallback={null}>
                <AnimatedModel />
            </React.Suspense>

            <mesh ref={cubeRef} position={[3.2, 1, -2]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.8} />
            </mesh>
        </>
    )
}