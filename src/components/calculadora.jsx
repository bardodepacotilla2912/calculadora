import { useState, useEffect, useRef } from 'react';
import Pantalla from './Pantalla';
import Teclado from './teclado';
import calculadoraContext from '../CalculadoraContext';

function Calculadora() {
  const [estado, despachador]= useReducer(calculadoraReducer, estadoInicial)
  const valorInicialPantalla = localStorage.getItem('ultimoValorPantalla') || '0';
  /*
  const [valorPantalla, setValorPantalla] = useState(valorInicialPantalla);
  // const [valorPrevio, setValorPrevio] = useState(0);
  const valorPrevio = useRef(0);
  // const [operador, setOperador] = useState(null);
  const operador = useRef(null);
  // const [esperandoOperando, setEsperandoOperando] = useState()
  const esperandoOperando = useRef(false);
  */
 const pantallaRef = useRef(null)


  useEffect(() => {
    document.title = `Calculadora: ${estado.valorPantalla}`;
  });

  useEffect(() => {
    localStorage.setItem('ultimoValorPantalla', estado.valorPantalla);
  }, [estado.valorPantalla]);

  const presionarTecla = (tecla) => {
    if ('0123456789'.includes(tecla)) {
      pantallaRef.current?.blur();
      if (esperandoOperando.current) {
        setValorPantalla(tecla);
        esperandoOperando.current = false;
      } else {
        setValorPantalla((previo) => (previo === '0' ? tecla : previo + tecla));
      }
    } else if ('+-*/'.includes(tecla)) {
      valorPrevio.current = valorPantalla;
      operador.current = tecla;
      esperandoOperando.current = true;
    } else if (tecla === '=') {
      if (operador && !esperandoOperando.current) {
        const nuevoValor = eval(`${valorPrevio.current} ${operador.current} ${valorPantalla}`);
        setValorPantalla(Number.parseInt(nuevoValor));
        operador.current = null;
        esperandoOperando.current = false;
        pantallaRef.current.focus();
      }
    } else if (tecla === 'C') {
      pantallaRef.current?.blur();
      setValorPantalla('0');
      operador.current = null;
      esperandoOperando.current = false;
      
    }
  };

  return (
    <calculadoraContext.Provider value={{ valorPantalla, presionarTecla, pantallaRef }}>
      <div style={styles.calculadora}>
        <Pantalla />
        <Teclado />
      </div>
    </calculadoraContext.Provider>
    
  );
}

const styles = {
  calculadora: {
      margin: '50px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1
  }
}

export default Calculadora;