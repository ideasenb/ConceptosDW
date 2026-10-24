import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useAnimations } from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

// importación del modelo
function AnimatedModel() {

    const modelRef = useRef()

    // Carga del modelo 3D
    const fbx = useLoader(FBXLoader, '/models/Viejo.fbx')

    // animaciones
    const { animations } = fbx
    const { actions } = useAnimations(animations, modelRef)

    // Estado local para hover
    const [hovered, setHovered] = useState(false)

    // animaciones cargando
    useEffect(() => {
        if (animations && animations.length > 0) {
            const action = actions[animations[0].name]
            if (action) {
                action.reset().fadeIn(0.5).play()
            }
        }
    }, [actions, animations])


    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    return (
        <group ref={modelRef}>
            <primitive
                object={fbx}
                scale={0.02} // Escala proporcional del personaje
                position={[1.5, -2, 0]} // Ubicación centrada/derecha
                onPointerOver={(e) => {
                    e.stopPropagation()
                    setHovered(true)
                }}
                onPointerOut={() => setHovered(false)}
            />
        </group>
    )
}

// iluminación
export default function SceneContent() {

    const caneRef = useRef()

    // Paleta de colores veraniegos 
    const summerColors = [
        '#f97316',
        '#22c55e',
        '#fbbf24',
        '#06b6d4',
        '#ec4899',
        '#84cc16'
    ]

    // Estado 1: Índice del color actual del bastón (cambia únicamente al hundirle)
    const [colorIndex, setColorIndex] = useState(0)

    // Estado 2: Indica si el mouse está pasando por encima (hover para agrandar)
    const [isHovered, setIsHovered] = useState(false)

    // useMemo: Genera la curva 3D suave que define la silueta clásica del bastón 
    const caneCurve = useMemo(() => {
        const points = [
            new THREE.Vector3(0, -0.9, 0),
            new THREE.Vector3(0, 0.45, 0),
            new THREE.Vector3(0.04, 0.65, 0),
            new THREE.Vector3(0.18, 0.82, 0),
            new THREE.Vector3(0.32, 0.68, 0),
            new THREE.Vector3(0.30, 0.50, 0)
        ]

        return new THREE.CatmullRomCurve3(points)
    }, [])

    useFrame((state, delta) => {
        if (caneRef.current) {
            // 1. Efecto de LEVITACIÓN / FLOTACIÓN
            caneRef.current.position.y = 0.8 + Math.sin(state.clock.elapsedTime * 1.6) * 0.1

            // 2. Rotación continua 3D
            const speedMultiplier = isHovered ? 1.4 : 0.8
            caneRef.current.rotation.y += delta * speedMultiplier
            // Ligero bamboleo pendular en el ángulo Z y X 
            caneRef.current.rotation.z = 0.2 + Math.sin(state.clock.elapsedTime * 1.2) * 0.08
            caneRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 1.0) * 0.06


            const targetScale = isHovered ? 1.28 : 1.0

            caneRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                delta * 7
            )
        }
    })

    // Función al PASAR el mouse por encima SOLO agranda su tamaño
    const handlePointerOver = (e) => {
        e.stopPropagation()
        setIsHovered(true)
        document.body.style.cursor = 'pointer'
    }

    // Función al QUITAR el mouse del bastón: desactiva el tamaño grande
    const handlePointerOut = (e) => {
        e.stopPropagation()
        setIsHovered(false)
        document.body.style.cursor = 'auto'
    }

    // Función al HUNDIRLE cambia al siguiente color de la paleta
    const handlePointerDown = (e) => {
        e.stopPropagation()
        setColorIndex((prev) => (prev + 1) % summerColors.length)
    }

    return (
        <>
            {/* OrbitControls*/}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
            />

            {/* luces */}
            <ambientLight intensity={0.75} color="#fef3c7" />
            <directionalLight position={[5, 5, 5]} intensity={1.3} color="#fffbeb" castShadow />
            <pointLight position={[-5, 5, -5]} intensity={0.5} color="#fed7aa" />

            {/* Modelo 3D del viejito */}
            <React.Suspense fallback={null}>
                <AnimatedModel />
            </React.Suspense>

            <group
                ref={caneRef}
                position={[3.2, 0.8, -1.8]} //ubicación
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
            >
                {/* cuerpo del bastón*/}
                <mesh>
                    <tubeGeometry args={[caneCurve, 64, 0.045, 20, false]} />
                    <meshStandardMaterial
                        color={summerColors[colorIndex]}
                        roughness={0.25}
                        metalness={0.65}
                    />
                </mesh>

                {/*Anillo decorativo dorado debajo del mango */}
                <mesh position={[0, 0.38, 0]}>
                    <cylinderGeometry args={[0.052, 0.052, 0.05, 24]} />
                    <meshStandardMaterial color="#fde047" roughness={0.2} metalness={0.85} />
                </mesh>

                {/*Regatón / punta de goma en la base del bastón*/}
                <mesh position={[0, -0.9, 0]}>
                    <sphereGeometry args={[0.048, 16, 16]} />
                    <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.2} />
                </mesh>

                {/*tapa redondeada*/}
                <mesh position={[0.30, 0.50, 0]}>
                    <sphereGeometry args={[0.046, 16, 16]} />
                    <meshStandardMaterial
                        color={summerColors[colorIndex]}
                        roughness={0.25}
                        metalness={0.65}
                    />
                </mesh>
            </group>
        </>
    )
}