// TODO: move models folder outside of components folder

// TODO: review all types and remove unused types
// TODO: create Cells type based on Player type
// TODO: the type name "Cells" is incorrect. It is much better to name it as "CellState"
export type Cells = "0" | "X" | null;
export type Player = "0" | "X";
export type Position = {
  row: number;
  column: number;
};
export type TurnHistory = {
  player: Player;
  // TODO: lets rename place to position. Position is a better name for a position on the board. Also the type is named as Position.
  place: Position;
};
export type Cell = {
  // TODO: we have a separate type for it. it calls Cells|CellState.
  player: Player | null;
  // TODO: lets rename place to position. Position is a better name for a position on the board. Also the type is named as Position.
  place: Position;
};
// TODO: lets rename it to CellStyles.
export type CellWidth = {
  // TODO: lets rename it to width.
  divWith: number;
  fontSize: number;
};
// TODO: lets rename it to FormValues.
export type IsCorrect = {
  boardSize: string | null;
  winCombinationLength: string | null;
  amountOfUnDisappearingCells: string | null;
};
