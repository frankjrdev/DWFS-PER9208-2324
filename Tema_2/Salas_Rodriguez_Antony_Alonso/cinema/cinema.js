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
                estado: true // Estado inicial ocupado
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

butacas[8][1].estado = false;
butacas[8][3].estado = false;
butacas[8][4].estado = false;

butacas[7][1].estado = false;
butacas[7][2].estado = false;
butacas[7][3].estado = false;

butacas[6][1].estado = false;
butacas[6][2].estado = false;
butacas[6][3].estado = false;
butacas[6][4].estado = false;

butacas[0][1].estado = false;
butacas[0][2].estado = false;
butacas[0][3].estado = false;
butacas[0][4].estado = false;
butacas[0][5].estado = false;
butacas[0][6].estado = false;
butacas[0][7].estado = false;
butacas[0][8].estado = false;

// Imprimir la matriz
//console.log(butacas);

function suggest(n) {
    cont = 1;
    temp = 0;
    butacas.reverse();
    let reservas = []
    for (let i = 0; i < butacas.length && butacas.length >= n && cont <= n; i++) {
       for (let j = 0; j < butacas[i].length && cont <= n ; j++) {
        if (butacas[i][j].estado === false) {
            reservas.push(butacas[i][j].id)
            cont++;
        } else {
            reservas=[]
            cont =1
        }
       }
    }
    return reservas
}
console.log(`Butacas disponibles: ${suggest(8)}`)