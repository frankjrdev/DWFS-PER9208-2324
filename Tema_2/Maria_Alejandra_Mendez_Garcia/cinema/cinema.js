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



function suggest(num_asientos){

    /*Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un conjunto vacío.
Si en ninguna fila hay suficientes asientos disponibles juntos , la función debe devolver un conjunto vacío.
Se comenzará a buscar asientos juntos en la fila más lejana a la pantalla, por lo que si varias filas pueden albergar el
número de asientos solicitado, se elegirá siempre la más lejana a la pantalla. El resultado debe ser un Set con los ids de los asientos preseleccionados.*/

    let asientos_escogidos = new Set();
    let asientos_escogidos_comple = false;
    let contador = 0;
    let asiento_ocupado=false
    if(num_asientos <= butacas.length)
    {
        for (let fila = butacas.length - 1; fila >= 0 && asientos_escogidos_comple === false; fila--)
        {
            asiento_ocupado=false;
            for (let columna = butacas.length - 1; columna >=0 && asientos_escogidos_comple === false && asiento_ocupado === false; columna--)
            {
                if (butacas[fila][columna].estado === false && contador < num_asientos)
                {
                    asientos_escogidos.add(butacas[fila][columna].id);//agregos el id de los asientos que se van seleccionado
                    contador++;//contador para contar los asientos seleecionados
                    if (contador === num_asientos)
                    {
                        asientos_escogidos_comple = true;
                    }
                } else {
                    asientos_escogidos.clear();
                    contador = 0;
                    asiento_ocupado=true;
                }
            }
        }

    }
    return asientos_escogidos;
}

// Inicializar la matriz
let butacas = setup();

//Asignar valores true a determinados asientos
butacas[8][0].estado=true;
butacas[8][1].estado=true;
butacas[8][2].estado=true;
butacas[8][3].estado=true;
butacas[8][4].estado=true;
butacas[1][8].estado=true;
butacas[1][7].estado=true;
butacas[1][6].estado=true;
butacas[9][4].estado=true;
butacas[5][3].estado=true;
butacas[5][4].estado=true;
butacas[5][5].estado=true;


// Imprimir la matriz
//console.log(butacas);

//Imprimir el resultado del metodo suggest
console.log("Los asientos que se sugiere para seleccionar son:", suggest(10));
