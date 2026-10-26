import { useThree } from "@react-three/fiber";
import carta from './carta.jsx'



export default function Tablero(cartas, volteadas, encontradas, alHacerClic) {
    const carta = cartas[0]
    if (!carta) return null;

    return (
        <carta posicion={carta.posicion}
            imagen={carta.imagen}
            bocaArriba={volteadas.includes(0) || encontradas.includes(carta.id)}
            encontrada={encontradas.includes(carta.id)}
            alHacerClic={() => alHacerClic(0)} />

    )
}

