const estadoInicial = {
    valorPantalla: '0',
    valorPrevio: 0,
    operador: null,
    esperandoOperando: false
}

function calculadoraReducer(estado, accion) {
    switch(accion){
        case'PRESIONAR_NUMERO':{
            if (estado.esperandoOperando) {
                return {
                    ...estado,
                    valorPantalla: accion.numero,
                    esperandoOperando: false
                }
            }
        }
        case 'PRESIONAR_OPERADOR':{

        }
        case 'CALCULAR_RESULTADO':{

        }
        case 'LIMPIAR':{

        }
    }
}

export {estadoInicial}