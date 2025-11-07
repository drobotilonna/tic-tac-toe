import React from "react";
import { Cell, CellWidth, Position, Player } from "./models/gameType";
import CellComponent from "./Cell";

type RowComponentProps = {
  rowInd: number;
  cellSize: CellWidth;
  // TODO: rename it to handleCellClick
  changePole: (pos: Position, player: Player | null) => void;
  winnerCombination: Position[] | null;
  row: Cell[];
};

// TODO: rename it to Row. Never add "Component" to the name.
function RowCompoment({ rowInd, cellSize, changePole, winnerCombination, row }: RowComponentProps) {
  return (
    <div>
      {/*  TODO: rename el to cell */}
      {row.map((el, colInd) => {
        return (
          <CellComponent
            // TODO: use el.place.column as the key instead of colInd.
            // we should use index only when there is nothing else to use as a key.
            key={colInd}
            colInd={colInd}
            rowInd={rowInd}
            cellSize={cellSize}
            changePole={() => {
              changePole({ row: rowInd, column: colInd }, el.player);
            }}
            el={el}
            winnerCombination={winnerCombination}
          />
        );
      })}
    </div>
  );
}

export default RowCompoment;
