// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

function suggest(numButacas, butacas) {
    let butacasSeleccionados = new Set();

    for (let i = butacas.length - 1; i >= 0; i--) {
        let fila = butacas[i];

        if (numButacas <= fila.length) {
            let contadorButacasLibres = 0;
            let tempButacasSeleccionadas = [];

            for (let j = 0; j < fila.length; j++) {
                if (butacasSeleccionados.size !== numButacas) {
                    if (!fila[j].estado) {
                        contadorButacasLibres++;
                        tempButacasSeleccionadas.push(fila[j].id);
                    } else {
                        contadorButacasLibres = 0;
                        tempButacasSeleccionadas = [];
                    }

                    if (contadorButacasLibres === numButacas) {
                        for (const seat of tempButacasSeleccionadas) {
                            butacasSeleccionados.add(seat);
                        }
                    }
                }
            }
        }
    }

    return butacasSeleccionados;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

//Imprimir sugerencia de butacas
console.log(suggest(10, butacas));