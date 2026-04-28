import { useContext, useState } from "react";
import calculadoraContext from "../CalculadoraContext";

function Pantalla () {
    const {valorPantalla, pantallaRef} = useContext(calculadoraContext)
    const [enfocado, setEnfocado] = useState(false) 

    return(
        <input style={enfocado ? styles.enfocado : styles.desenfocado} 
            ref={pantallaRef} 
            onFocus={() => setEnfocado(true)} 
            onBlur={() => setEnfocado(false)}
            readOnly
            value={valorPantalla}
            />
    );

}

const styles = {
    desenfocado:{
        border: '5px solid #ddd',
        padding: '50px 30px',
        marginBottom: '10px',
        textAlign: 'right',
        fontSize: '7rem',
    },
    enfocado: {
        backgroundColor: "#127d26",
        border: '5px solid #ddd',
        padding: '50px 30px',
        marginBottom: '10px',
        textAlign: 'right',
        fontSize: '7rem',
    }
    
};

export default Pantalla;