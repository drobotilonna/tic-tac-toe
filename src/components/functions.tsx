import { Cells, Player, Position, Cell } from "./models/gameType";

// TODO: file function is not a component. It should not be in the components folder. create a separate folder for functions. It can be called as "helpers".
export const checkRowWinner = (row: (Cell | null)[], winnerCount: number): Cell[] | null => {
  // TODO: actually we don't need currentValue.  the currentValue could be taken from winnerCombination.
  // SO remove currentValue from here and create a constant currentPlayer inside the forEach loop.
  // If you do it you will not be required to set currentValue anywhere in the code (only the winnerCombination)
  let currentValue: Cell | null = null;
  let winnerCombination: Cell[] = [];
  row.forEach((cell) => {
    if (winnerCombination.length === winnerCount) {
      return;
    }
    // TODO: here you should create a constant currentPlayer based on the winnerCombination

    // TODO: always use === instead of == AND !== instead of !=
    if (cell?.player == null || cell == null) {
      currentValue = null;
      winnerCombination = [];
      return;
    }
    if (currentValue?.player == cell.player && currentValue?.player != null) {
      winnerCombination = [...winnerCombination, cell];
    } else {
      currentValue = cell;
      winnerCombination = [cell];
    }
  });

  if (winnerCombination.length < winnerCount) {
    return null;
  }

  return winnerCombination;
};

export const checkColWinner = (board: (Cell | null)[][], winCombinationLength: number) => {
  for (let col = 0; col < board[0].length; col++) {
    let newArr: (Cell | null)[] = [];
    for (let row = 0; row < board.length; row++) {
      newArr = [...newArr, board[row][col]];
    }
    const isWinnerInCol: Cell[] | null = checkRowWinner(newArr, winCombinationLength);
    // TODO: remove console.log AND write it in a 1 row
    if (isWinnerInCol) {
      console.log(isWinnerInCol, "c");
      return isWinnerInCol;
    }
  }
  return null;
};

export function getNullArray(amount: number): null[] {
  const nullArr = Array(amount).fill(null);
  return nullArr;
}

export function checkBoardWinner(board: Cell[][], winCombinationLength: number) {
  for (let i = 0; i < board.length; i++) {
    const isWinnerInRow = checkRowWinner(board[i], winCombinationLength);

    // TODO: make it a one row
    if (isWinnerInRow) {
      return isWinnerInRow;
    }
  }

  const isWinnerInCol = checkColWinner(board, winCombinationLength);

  // TODO: make it a one row
  if (isWinnerInCol) {
    return isWinnerInCol;
  }

  //   //diagonal1
  const diagonalBoard1 = board.map((el, ind) => {
    let length = board[0].length - 1;

    return [...getNullArray(length - ind), ...el, ...getNullArray(ind)];
  });
  const isDiagonalWinner = checkColWinner(diagonalBoard1, winCombinationLength);

  //diagonal2
  const diagonalBoard2 = board.map((el, ind) => {
    let length = board[0].length - 1;

    return [...getNullArray(ind), ...el, ...getNullArray(length - ind)];
  });
  const isDiagonalWinner2 = checkColWinner(diagonalBoard2, winCombinationLength);
  // TODO: make it a one row
  if (isDiagonalWinner2) {
    console.log(isDiagonalWinner2, "d");
    return isDiagonalWinner2;
  }

  // TODO: make it a one row AND move it to the diagonal1 part
  if (isDiagonalWinner) {
    console.log(isDiagonalWinner, "d2");
    return isDiagonalWinner;
  }

  return null;
}
