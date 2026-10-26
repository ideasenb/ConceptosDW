// CARTA

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture, RoundedBox, Text } from "@react-three/drei"
import * as THREE from "three"

const ANCHO = 1.3;
const ALTO = 1.9;
const GROSOR = 0.06;

export default function Carta(posicion, imagen, bocaArriba, encontrada, alHacerClic) {
    const group = useRef();
    const [encima, setEncima] = useState(false);

    //useText descargar la imagen y la convierte en textura para THREEJS
    const textura = useTexture(imagen);
    texture.colorSpace = THREE.SRGBColorSpace;

    //UseFrame por cuadro (60FPS)
    useFrame((estado, delta) => {
        //rotacion
        const g = group.current;

        //voltear (0 = boca abajo, Math.PI = boca arriba)
        const rotacionObjetivo = bocaArriba ? Math.PI : 0;
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, rotacionObjetivo, 8, delta);

        //escalado (encima o no)
        const escalaObjetivo = encima && !bocaArriba ? 1.08 : 1;
        const sx = THREE.MathUtils.damp(g.scale.x, escalaObjetivo, 10, delta);
        g.scale.set(sx, sx, sx);

        //cartas encontradas flotan
        const alturaObjetivo = encontrada;



        return (

            <group ref={group} position={posicion} onClick={(e) => {
                e.stopPropagation();
                alHacerClic();
            }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setEncima(true)
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setEncima(false)
                    document.body.style.cursor = 'auto';
                }}
            >
                <RoundedBox args={[ANCHO, ALTO, GROSOR]} radius={0.15} smoothness={10}>
                    <meshStandardMaterial
                        color={encima || bocaArriba ? "white" : "#04a279"}
                        roughness={0.3}
                        metalness={0.1}
                    />
                </RoundedBox>

                <group position={[0, 0, GROSOR / 2] + 0.001}>
                    <mesh position={[0, 0, 0]}>
                        <ringGeometry args={[0.3, 0.46, 48]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                </group>

                <group position={[0, 0, -GROSOR / 2] + 0.001} rotation={[0, Math.PI, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <ringGeometry args={[0.3, 0.46, 48]} />
                        <meshStandardMaterial map={textura} />
                    </mesh>
                </group>

            </group>
        )


    });





}