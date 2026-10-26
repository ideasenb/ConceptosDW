import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { getCharacter } from "./api"
import Tablero from "./components/Tablero"


export default function App() {
  const [personajes, setPersonajes] = useState([]);
  const [volteadas, setVolteadas] = useState([false]);


  useEffect(() => {
    getCharacter(6).then((lista) => {
      //console.log(lista);
      setPersonajes(lista);
    })
  }, [personajes]);

  const [encontradas, setEncontradas] = useState([]);


  return (
    <canvas camera={{ fov: 45, position: [0, 0, 7] }}>
      <Tablero cartas={personajes} personajes={personajes} volteadas={volteadas} encontradas={encontradas} alHacerClic={(i) => setVolteadas(i)} />
    </canvas>




  )
}