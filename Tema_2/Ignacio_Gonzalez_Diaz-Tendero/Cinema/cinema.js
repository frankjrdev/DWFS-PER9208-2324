// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas
const X= 0.2 // Porcentaje de la sala ocupada

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

    // Calcular el número de butacas ocupadas a agregar (20% de la dimensión de la sala)
    const numButacasOcupadas = Math.floor((N * N) * X);

    // Asignar aleatoriamente las butacas ocupadas
    for (let k = 0; k < numButacasOcupadas; k++) {
        let filaAleatoria = Math.floor(Math.random() * N);
        let columnaAleatoria = Math.floor(Math.random() * N);
        butacas[filaAleatoria][columnaAleatoria].estado = true;
    }

    return butacas;
}


// Función para imprimir el estado de la sala
function printSeats(butacas) {
    // Imprimir fila superior con números de butacas
    let filaSuperior = '  ';
    for (let j = 0; j < N; j++) {
        filaSuperior += (j + 1) + ' ';
    }
    console.log(filaSuperior);

    // Imprimir sala con estado de las butacas y rango de butacas
    for (let i = 0; i < N; i++) {
        let fila = (i + 1) + '- '; // Rango de butacas para la fila actual
        for (let j = 0; j < N; j++) {
            fila += butacas[i][j].estado ? 'X ' : 'O ';
        }
        console.log(fila);
    }
}


// Función para solicitar posición de asientos ocupados en un bucle infinito
function fillSeatsInfinite(butacas) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Puedes ingresar las posiciones de los asientos ocupados de forma manual en el formato "fila,columna" o dejar que se rellenen al azar.');
    console.log('Ejemplo: Para marcar el asiento en la primera fila y primera columna, ingresa "1,1".');
    console.log('Cuando hayas terminado, escribe "fin" para continuar.');

    function fillSeat() {
        readline.question('Posición ocupada: ', (position) => {
            if (position.toLowerCase() === 'fin') {
                readline.close();
                console.log('Estado actualizado de la sala:');
                printSeats(butacas);
                // Una vez que el usuario termina de ingresar posiciones, ejecutar la función suggest
                suggestSeats(butacas);
            } else {
                const [fila, columna] = position.split(',').map(val => parseInt(val.trim()) - 1);
                if (!isNaN(fila) && !isNaN(columna) && fila >= 0 && fila < N && columna >= 0 && columna < N) {
                    butacas[fila][columna].estado = true;
                } else {
                    console.log('Posición inválida.');
                }
                fillSeat();
            }
        });
    }

    fillSeat();
}

// Función para sugerir asientos
function suggest(numAsientos, butacas) {
    const selectedSeats = new Set();
    let stopLoop = false; // Variable de control para detener el bucle exterior

    // CASO 1:
    if (numAsientos > N) {
        stopLoop = true; // Establecemos la variable de control para detener el bucle exterior
    }

    // Recorremos las filas desde la más lejana a la pantalla
    for (let i = N - 1; i >= 0 && !stopLoop; i--) {
        let availableSeats = 0; // Contador de asientos disponibles consecutivos
        let startIdx = -1; // Índice de inicio de asientos disponibles consecutivos

        // Recorremos los asientos de la fila actual
        for (let j = 0; j < N && !stopLoop; j++) {
            // Verificamos si el asiento está libre
            if (!butacas[i][j].estado) {
                // Si no hay asientos disponibles consecutivos reiniciamos el contador
                if (availableSeats === 0) {
                    startIdx = j;
                }
                availableSeats++; // Incrementamos el contador de asientos disponibles consecutivos

                // Si encontramos suficientes asientos consecutivos
                if (availableSeats === numAsientos) {
                    // Agregamos los IDs de los asientos seleccionados al Set
                    for (let k = 0; k < numAsientos; k++) {
                        selectedSeats.add(butacas[i][startIdx + k].id);
                    }
                    stopLoop = true; // Establecemos la variable de control para detener el bucle exterior
                }
            } else {
                // Reiniciamos el contador de asientos disponibles consecutivos
                availableSeats = 0;
            }
        }
    }
    // CASO 2:
    // Devolvemos un Set vacío si no se encuentran suficientes asientos disponibles juntos
    return selectedSeats;
}


// Función para solicitar el número de asientos y sugerirlos
function suggestSeats(butacas) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('¿Cuántos asientos deseas sugerir?: ', (numAsientos) => {
        const seats = suggest(parseInt(numAsientos), butacas);
        console.log('Asientos sugeridos:', seats);
        readline.close();
    });
}

// Inicializar la matriz
let butacas = setup();
// console.log(butacas);

// Ejecutar el bucle infinito para llenar la sala con posiciones ocupadas
fillSeatsInfinite(butacas);
