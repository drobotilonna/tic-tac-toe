import { Cell } from '../../models/gameType';

// TODO: helpers folder should not be inside the components folder. It should be in the root of the project.

// TODO: There is a problem in the helpers folder there is 2 files: helpers and functions. They Both named very abstractly.
// there is 2 ways how it should be:
// 1) each function should be in a separate file. The name of this file should be the same as the function name.
// Also if you see that some functions related to the same thing -> you can create a separate folder in the helpers folder and put all the related functions in it.
// 2) You can group some functions related to the same thing in the same file. BUT the name of this file should be specific enough to understand what it is for.
// So in our case I can see that in this file we group our functions related to the winner checking.
// So we should rename this file to checkBoardWinner.ts.

// TODO: this function is used only in this file. So we should not export it.
export const checkRowWinner = (
  row: (Cell | null)[],
  winnerCount: number
): Cell[] | null => {
  let winnerCombination: Cell[] = [];
  row.forEach((cell) => {
    if (winnerCombination.length === winnerCount) {
      return;
    }

    let currentPlayer = winnerCombination[0]?.player;

    if (cell?.player === null || cell === null) {
      currentPlayer = null;
      winnerCombination = [];
      return;
    }
    if (currentPlayer === cell.player && currentPlayer !== null) {
      winnerCombination = [...winnerCombination, cell];
    } else {
      currentPlayer = cell.player;
      winnerCombination = [cell];
    }
  });

  if (winnerCombination.length < winnerCount) {
    return null;
  }

  return winnerCombination;
};

// TODO: this function is used only in this file. So we should not export it.
export const checkColWinner = (
  board: (Cell | null)[][],
  winCombinationLength: number
) => {
  for (let col = 0; col < board[0].length; col++) {
    let newArr: (Cell | null)[] = [];
    for (let row = 0; row < board.length; row++) {
      newArr = [...newArr, board[row][col]];
    }
    const isWinnerInCol: Cell[] | null = checkRowWinner(
      newArr,
      winCombinationLength
    );

    if (isWinnerInCol) return isWinnerInCol;
  }
  return null;
};

// TODO: this function is not related specifically to the winner checking process. It so so abstract that it can be used in other places.
// So it is better to put it to the new file in the helpers folder and export it from there.
export function getNullArray(amount: number): null[] {
  const nullArr = Array(amount).fill(null);
  return nullArr;
}

export function checkBoardWinner(
  board: Cell[][],
  winCombinationLength: number
) {
  for (let i = 0; i < board.length; i++) {
    const isWinnerInRow = checkRowWinner(board[i], winCombinationLength);
    if (isWinnerInRow) return isWinnerInRow;
  }

  const isWinnerInCol = checkColWinner(board, winCombinationLength);
  if (isWinnerInCol) return isWinnerInCol;

  // diagonal1
  const diagonalBoard1 = board.map((el, ind) => {
    let length = board[0].length - 1;

    return [...getNullArray(length - ind), ...el, ...getNullArray(ind)];
  });
  const isDiagonalWinner = checkColWinner(diagonalBoard1, winCombinationLength);
  if (isDiagonalWinner) return isDiagonalWinner;

  // diagonal2
  const diagonalBoard2 = board.map((el, ind) => {
    let length = board[0].length - 1;

    return [...getNullArray(ind), ...el, ...getNullArray(length - ind)];
  });
  const isDiagonalWinner2 = checkColWinner(
    diagonalBoard2,
    winCombinationLength
  );
  if (isDiagonalWinner2) return isDiagonalWinner2;

  return null;
}
