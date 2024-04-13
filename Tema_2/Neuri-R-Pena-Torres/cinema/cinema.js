
/**
 * FUNCION PARA CREAR EL CONJUNTO DE ASIENTOS DE LA SALA
 * @param size - Total asientos de la sala es igual size*size, No Filas=size, No Columnas=size
 */
function createSets(size = 10){

    let butacas = [];
    let setid = 0;

    for (let row = 0; row < size; row++) {
        
        let fila = []; // Nueva fila
        for (let set = 0; set < size; set++) {

            // Nuevo asiento
            fila.push({
                id: setid++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }

    return butacas;
}

/**
 * FUNCION PARA IMPRIMIR LOS ASIENTOS DE LA SALA Y SU ESTADO
 * @param sets - Coleccion de asientos de la sala
 */
function showAllSets(sets = []){

    console.log("==============ASIENTOS==============");
    sets.forEach(function(row, id){

        let setsRow =`FILA ${id+1}:`;
        row.forEach((set)=>{

            setsRow += set.estado? "[x]" : "[ ]";
        });

        console.log(setsRow);

    });
    console.log("\n");
}

/**
 * Funcion para imprimir la reserva/asientos solicitados
 */
function showBooked(requested, booked){

    let details = `Solicitados: ${requested}, Reservados: ${booked.size} {`;
    booked.forEach(item => {

        details += `[${item}] `;
    });

    details = details.trimEnd()+ "}";
    console.log(details);
}

/**
 * FUNCION PARA RESERVA DE ASIENTOS
 * @param sets - Coleccion de asientos de la sala
 * @param booking - Cantidad de asientos solicitados para reserva
 */
function suggest(sets, booking = 1){

    let booked = new Set();
    for (let row = sets.length-1; (row >= 0 && booked.size < booking); row--){//empezamos a buscar por la ultima fila

        let selected = [];
        for (let set = 0; (set < sets[row].length && selected.length < booking && booking <= sets[row].length); set++) {

            if(sets[row][set].estado == false){

                selected.push(sets[row][set]);//se seleccionan los asientos contiguos que este disponibles
            }
        }

        if(selected.length == booking){//si la seleccion es igual a la cantidad pedida en reserva, se procede a reservarlos, de lo contrario, se busca en la siguiente fila

            selected.forEach(item =>{

                booked.add(item.id);
                item.estado = true;
            });
        }
    }

    return booked;
}


const sets = createSets();

let booked0 = suggest(sets, 11);
let booked1 = suggest(sets, 7);
let booked2 = suggest(sets, 2);
let booked3 = suggest(sets, 3);

showAllSets(sets);

showBooked(11, booked0);
showBooked(7, booked1);
showBooked(2, booked2);
showBooked(3, booked3);