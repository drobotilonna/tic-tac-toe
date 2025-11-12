export type Cells = '0' | 'X' | null;
export type Player = '0' | 'X';
export type Position = {
  row: number;
  column: number;
};
export type TurnHistory = {
  player: Player;
  position: Position;
};
export type Cell = {
  player: Cells;
  position: Position;
};
export type CellWidth = {
  width: number;
};
export type FormValue = {
  boardSize: string | null;
  winCombinationLength: string | null;
  amountOfUnDisappearingCells: string | null;
};
export type TCell = {
  player: Cells;
  position: Position;
};
