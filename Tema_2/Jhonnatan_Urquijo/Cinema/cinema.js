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
                estado: idContador > 90 ? true : false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

function suggest(numButacas) {
    let setupButacas = setup();
    return setupButacas.reverse()
        .find((row) => {
            let consecutiveFree = 0;
            return row.some((butaca) => {
                if (!butaca.estado) {
                    consecutiveFree++;
                    return consecutiveFree === numButacas;
                } else {
                    consecutiveFree = 0;
                    return false;
                }
            });
        })
        ?.slice(0, numButacas)
        .map((butaca) => butaca.id) || new Set();
}


// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

console.log(suggest(3, setup()))