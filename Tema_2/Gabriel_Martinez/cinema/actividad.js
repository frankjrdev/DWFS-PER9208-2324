// Definir el tamaño de la matriz de butacas
const N = 5; // Número de filas y columnas

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
                estado: true // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Función para sugerir butacas consecutivas
function suggest(seats, qty){
    let seatSuggestion = [];
    for (let i = seats.length - 1; i >= 0 && seatSuggestion.length < qty; i--){
        for (let j = 0; j < seats[i].length && seatSuggestion.length < qty; j++){
            if (!seats[i][j].estado){
                seatSuggestion.push(seats[i][j])
            }
            else{
                seatSuggestion = []
            }
        }
    }
    return seatSuggestion.length === qty ? seatSuggestion : [] ;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

butacas[0][0].estado = false;
butacas[0][2].estado = false;
butacas[0][3].estado = false;

butacas[3][0].estado = false;
butacas[3][1].estado = false;
butacas[3][3].estado = true;
butacas[3][4].estado = true;

let seatSuggestion = suggest(butacas, 6);

console.log(seatSuggestion);

