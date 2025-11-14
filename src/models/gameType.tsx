export type CellState = Player| null;
export type Player = "0" | "X";
export type Position = {
  row: number;
  column: number;
};
export type TurnHistory = {
  player: Player;
  position: Position;
};
export type CellWidth = {
  width: number;
};
export type TCell = {
  player: CellState;
  position: Position;
};
export type GameSettings = {
  boardSize: number;
  winCombinationLength: number;
  enableDisappearingMode: boolean;
  amountOfUnDisappearingCells: number;
};
