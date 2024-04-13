// App Constants
const A_CHAR_CODE = 65;

/**
 * @param {int} cinemaSize
 * @param {int} row
 * @param {int} col
 * @returns {string}
 */
const getSeatCode = (cinemaSize, row, col) => {
  return `${String.fromCharCode(A_CHAR_CODE + cinemaSize - row - 1)}${col + 1}`;
};

/**
 * Given a cinema size, it returns the matrix
 * representation of the seats with all of them
 * unavailable
 * @param {int} cinemaSize
 * @returns {{id:string, row:int, col:int available:boolean}[][]}
 */
const setup = (cinemaSize) => {
  const seats = [];

  for (let i = 0; i < cinemaSize; i++) {
    const row = [];
    for (let j = 0; j < cinemaSize; j++) {
      row.push({
        id: getSeatCode(cinemaSize, i, j),
        row: i + 1,
        col: j + 1,
        available: false,
      });
    }
    seats.push(row);
  }
  return seats;
};

/**
 * Given a seats matrix and a number of seats
 * input by the user it suggests an option in
 * the given matrix that satisfies the user
 * input with seats followed by one another
 * @param {{id:string, row:int, col:int available:boolean}[][]} seatsMatrix
 * @param {int} numberOfSeats
 * @returns {{id:string, row:int, col:int available:boolean}[]}
 */
const suggest = (seatsMatrix, numberOfSeats) => {
  let found = [];

  if (numberOfSeats > seatsMatrix.length) return found;

  for (const row of seatsMatrix.slice().reverse()) {
    for (const i in row) {
      const subRow = row.slice(parseInt(i), parseInt(i) + numberOfSeats);
      const isCorrectLength = subRow.length === numberOfSeats;
      const isSubRowFree = subRow.every((seat) => seat.available);
      if (isCorrectLength && isSubRowFree && !found.length) {
        found = subRow;
      }
    }
  }

  return found;
};

window.suggest = suggest;
window.getSeatCode = getSeatCode;
