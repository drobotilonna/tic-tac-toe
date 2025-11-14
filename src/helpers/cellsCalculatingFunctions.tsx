import { TurnHistory, TCell } from "../models/gameType";


export const createArrayByLength = (length: number) => {
  return Array.from({ length }, (el, index) => index);
};

export const calculateCells = (
  turnsHistory: TurnHistory[],
  boardSize: number
) => {
  const initialCells: TCell[][] = createArrayByLength(boardSize).map(
    (el) => {
      const row = createArrayByLength(boardSize);
      return row.map((col) => {
        return { player: null, position: { row: el, column: col } };
      });
    }
  );

  turnsHistory.forEach((turn) => {
    initialCells[turn.position.row][turn.position.column] = {
      player: turn.player,
      position: turn.position,
    };
  });

  return initialCells;
};
export const calculateCellStyles = (boardSize: number) => {
  const width = (490 - 15 * (boardSize - 1)) / boardSize;
  const fontSize = 110 - boardSize * boardSize;
  return {
    width,
    fontSize,
  };
};
