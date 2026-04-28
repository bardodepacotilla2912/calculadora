import { useContext } from "react";
import calculadoraContext from "../CalculadoraContext";

function Teclado(){
    const teclas = [
        '1', '2', '3', '+',
        '4', '5', '6', '-',
        '7', '8', '9', '*',
        'C', '0', '=', '/'
    ];

    const {presionarTecla} = useContext(calculadoraContext)

    return(
        <div style={styles.teclado}>
            {teclas.map((tecla) => (
            <button 
                style={styles.boton} 
                key={tecla}
                onClick={() => presionarTecla(tecla)}
            >
                {tecla}
            </button>
            ))}
        </div>
    );

}

const styles = {
    
    teclado : {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        flex: 1
    },
    boton : {
        padding: '15px',
        fontSize: '3rem',
        cursor: 'pointer'
    }
}

export default Teclado;