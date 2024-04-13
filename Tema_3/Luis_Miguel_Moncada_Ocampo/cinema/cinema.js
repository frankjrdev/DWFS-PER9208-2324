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

function suggest(numeroAsientos) {
 
    if (numeroAsientos > N) {
        return [];
    }

    let libresFila = [];
    let bucleActivo = true;
    for (let x = N - 1; x >= 0 && bucleActivo; x--) {
        libresFila = [];
        for (let y = N - 1; y >= 0 && bucleActivo; y--) {
            if (butacas[x][y].estado === false) {
                libresFila.push(butacas[x][y].id);
                if (libresFila.length === numeroAsientos) {
                    bucleActivo = false;
                }
            } else {
                libresFila = [];
            }
        }
    }
    console.log('Asientos Sugeridos', libresFila.toString());
    return libresFila;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log('Butacas Inicializadas',butacas);

//datos de prueba, butacas ocupadas
//fila 10 ocupada para 4 asientos contiguos
butacas[9][1].estado = true;
butacas[9][2].estado = true;
butacas[9][6].estado = true;
butacas[9][9].estado = true;

//fila 9 ocupada para 4 asientos contiguos
butacas[8][0].estado = true;
butacas[8][4].estado = true;
butacas[8][6].estado = true;

// Obtiene las butacas disponibles segun los asientos solicitados
//let butacasDisponibles = suggest(4)

// Imprimir las butacas encontradas disponibles y contiguas
//console.log('butacasDisponibles', butacasDisponibles);