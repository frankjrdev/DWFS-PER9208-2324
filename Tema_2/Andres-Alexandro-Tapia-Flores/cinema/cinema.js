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

const main = () => {
  const cinemaSize = 10;
  const numberOfSeats = 3;
  const seatsMatrix = setup(cinemaSize);

  // initialize available seats
  seatsMatrix[0][1].available = true;
  seatsMatrix[0][2].available = true;
  seatsMatrix[0][3].available = true;
  seatsMatrix[6][5].available = true;
  seatsMatrix[6][7].available = true;
  seatsMatrix[6][8].available = true;
  seatsMatrix[6][9].available = true;

  const suggestion = suggest(seatsMatrix, numberOfSeats);

  /**
   ------------- OUTPUT -------------
    {
      suggestion: [
        { id: 'D8', row: 7, col: 8, available: true },
        { id: 'D9', row: 7, col: 9, available: true },
        { id: 'D10', row: 7, col: 10, available: true }
      ]
    }
   */
  console.log({ suggestion });
};

main();
