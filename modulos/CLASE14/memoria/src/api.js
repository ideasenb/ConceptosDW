const API_URL = "https://rickandmortyapi.com/api/character/";

const cantidad = 6;

export async function getCharacter(cantidad) {
    const pagina = Math.floor(Math.random() * 42) + 1;
    const res = await fetch(`${API_URL}?page=${pagina}`);
    if (!res.ok) {
        throw new Error("Error al obtener los personajes");
    }
    const datos = await res.json();
    return barajar(datos.results).slice(0, cantidad).map(p => {
        return {
            id: p.id,
            nombre: p.name,
            imagen: p.image,
            estado: p.status,
            especie: p.species
        }
    });
}

export function barajar(arreglo) {
    const copia = [...arreglo]
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[copia[i], copia[j]] = [copia[j], copia[i]]
    }
    return copia
}

