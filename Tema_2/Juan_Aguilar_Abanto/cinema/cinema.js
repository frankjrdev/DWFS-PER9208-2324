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

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

function suggest(butacas, asientos) {
    let asientoSugeridos = [];
    let sugeridosTemp = [];

    if (asientos > N) {
        return asientoSugeridos;
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j <= N - asientos; j++) {
            let sugerido = [];

            let todosDisponibles = true;
            for (let k = 0; k < asientos; k++) {
                if (butacas[i][j + k].estado) {
                    todosDisponibles = false;
                }
                sugerido.push(butacas[i][j + k].id);
            }

            if (todosDisponibles) {
                sugeridosTemp.push(sugerido.slice());
            }
        }
    }

    if (sugeridosTemp.length > 0) {
        asientoSugeridos = sugeridosTemp[0];
    }

    return asientoSugeridos;
}



//Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.
let sobreCapacidad = suggest(butacas,15)
console.log("Asientos solicitados excede el tamaño máximo de la fila(15). Resultado: " + sobreCapacidad);

// Completando butacas
butacas[0][0].estado = true;
butacas[0][1].estado = true;
butacas[0][2].estado = true;
butacas[0][3].estado = true;

let asientosContiguos = suggest(butacas, 8); // Solicitar 8 asientos contiguos

console.log("Solicitar 8 asientos contiguos. Resultado: " + asientosContiguos);