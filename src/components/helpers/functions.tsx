import { Cells, Player, Position, Cell } from "../../models/gameType";

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

  //   //diagonal1
  const diagonalBoard1 = board.map((el, ind) => {
    let length = board[0].length - 1;

    return [...getNullArray(length - ind), ...el, ...getNullArray(ind)];
  });
  const isDiagonalWinner = checkColWinner(diagonalBoard1, winCombinationLength);
  if (isDiagonalWinner) return isDiagonalWinner;

  //diagonal2
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
