import { useState, useEffect } from 'react';

function Calculadora() {
  const valorInicialPantalla = localStorage.getItem('ultimoValorPantalla') || '0';

  const [valorPantalla, setValorPantalla] = useState(valorInicialPantalla);
  const [valorPrevio, setValorPrevio] = useState(0);
  const [operador, setOperador] = useState(null);
  const [esperandoOperando, setEsperandoOperando] = useState(false);

  useEffect(() => {
    document.title = `Calculadora: ${valorPantalla}`;
  });

  useEffect(() => {
    localStorage.setItem('ultimoValorPantalla', valorPantalla);
  }, [valorPantalla]);

  const presionarTecla = (tecla) => {
    if ('0123456789'.includes(tecla)) {
      if (esperandoOperando) {
        setValorPantalla(tecla);
        setEsperandoOperando(false);
      } else {
        setValorPantalla((previo) => (previo === '0' ? tecla : previo + tecla));
      }
    } else if ('+-*/'.includes(tecla)) {
      setValorPrevio(valorPantalla);
      setOperador(tecla);
      setEsperandoOperando(true);
    } else if (tecla === '=') {
      if (operador && !esperandoOperando) {
        const nuevoValor = eval(`${valorPrevio} ${operador} ${valorPantalla}`);
        setValorPantalla(Number.parseInt(nuevoValor));
        setOperador(null);
        setEsperandoOperando(false);
      }
    } else if (tecla === 'C') {
      setValorPantalla('0');
      setOperador(null);
      setEsperandoOperando(false);
    }
  };

  const teclas = [
    '1', '2', '3', '+',
    '4', '5', '6', '-',
    '7', '8', '9', '*',
    'C', '0', '=', '/'
  ];

  const pantallaStyle = {
    border: '5px solid #ddd',
    padding: '20px',
    marginBottom: '10px',
    textAlign: 'right',
    fontSize: '2rem',
  };

  const tecladoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  };

  const botonStyle = {
    padding: '15px',
    fontSize: '1.5rem',
  };

  return (
    <>
      <div style={pantallaStyle}>{valorPantalla}</div>
      <div style={tecladoStyle}>
        {teclas.map((tecla) => (
          <button
            style={botonStyle}
            key={tecla}
            onClick={() => presionarTecla(tecla)}
          >
            {tecla}
          </button>
        ))}
      </div>
    </>
  );
}

export default Calculadora;