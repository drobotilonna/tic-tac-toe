import React from "react";
import { Cell, CellWidth, Position } from "./models/gameType";
type CellComponentProps = {
  colInd: number;
  rowInd: number;
  cellSize: CellWidth;
  // TODO: rename it to onCellClick.
  changePole: () => void;
  // TODO: rename it to cell. "el" is not a good name. It is too generic.
  el: Cell;
  // TODO: add a prop "isWinningCell" to check if the cell is part of the winning combination.
  // and remove winnerCombination prop.
  // in the parent component create a function:
  // const isCellPartOfWinningCombination = (cell: NewCellState) => {
  //   return winnerCombination?.some((winningCell) => winningCell.pos.col === cell.pos.col && winningCell.pos.row === cell.pos.row);
  // };
  // and pass a new isWinningCell prop to this component:
  // isWinningCell={isCellPartOfWinningCombination(cell)}
  winnerCombination: Position[] | null;
};

// TODO: rename it to Cell. Never add "Component" to the name.
// once you rename it there will be a conflict. Because we have a type called Cell.
// so in import rename the type just for this component:
// import { Cell as TCell, CellWidth, Position } from "./models/gameType";
// And then use TCell instead of Cell.
function CellComponent({
  colInd,
  rowInd,
  cellSize,
  changePole,
  el,
  winnerCombination,
}: CellComponentProps) {
  return (
    <div
      style={{
        width: cellSize.divWith,
        height: cellSize.divWith,
        fontSize: cellSize.fontSize,
        ...(winnerCombination?.includes(el.place) ? { color: "green" } : {}),
      }}
      className={el.player == "X" ? "d" : "d2"}
      // TODO: you don't need to use colInd here. the key property should be provided in the parent component. Right near the map function.
      key={colInd}
      onClick={() => {
        changePole();
      }}
    >
      {el.player}
    </div>
  );
}

export default CellComponent;
