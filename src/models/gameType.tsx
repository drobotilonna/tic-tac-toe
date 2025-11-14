export type Player = '0' | 'X';
// TODO: rename this type to CellState
// TODO: use existing type - "Player".
export type Cells = '0' | 'X' | null;
export type Position = {
  row: number;
  column: number;
};
export type TurnHistory = {
  player: Player;
  position: Position;
};
export type Cell = {
  // TODO: rename "player" to "cellState"
  player: Cells;
  position: Position;
};
export type CellWidth = {
  width: number;
};
// TODO: remove this type.
export type FormValue = {
  boardSize: string | null;
  winCombinationLength: string | null;
  amountOfUnDisappearingCells: string | null;
};
// TODO: remove this type. We have the same type Cell.
export type TCell = {
  player: Cells;
  position: Position;
};
