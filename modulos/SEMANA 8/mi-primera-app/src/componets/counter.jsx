import { useState } from "react";
import "./counter.css";

function MiComponente() {
    const [contador, setContador] = useState(0);

    return (
        <div className="counter-container">
            <p className="counter-text">
                El contador es: <span className="counter-value">{contador}</span>
            </p>
            <button className="counter-button" onClick={() => setContador(contador + 1)}>
                Sumar
            </button>
        </div>
    );
}

export default MiComponente;