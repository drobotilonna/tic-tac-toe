import React from 'react';
import { TCell, CellWidth, Position, Player } from '../models/gameType';
import Cell from './Cell';

// TODO: we don't need a separate component for a row. But we need a component for a board. SO:
// 1) rename this component to GameBoard.
// 2) remove props rowInd, row
// 3) add props board: TCell[][]
type RowComponentProps = {
  rowInd: number;
  cellSize: CellWidth;
  handleCellClick: (pos: Position, player: Player | null) => void;
  winnerCombination: Position[] | null;
  row: TCell[];
};

function RowCompoment({
  rowInd,
  cellSize,
  handleCellClick,
  winnerCombination,
  row,
}: RowComponentProps) {
  const isCellPartOfWinningCombination = (cell: TCell) => {
    return winnerCombination?.some(
      (winningCell) =>
        winningCell.column === cell.position.column &&
        winningCell.row === cell.position.row
    );
  };

  return (
    <div>
      {row.map((cell, colInd) => {
        return (
          <Cell
            key={cell.position.column}
            colInd={colInd}
            rowInd={rowInd}
            cellSize={cellSize}
            onCellClick={() => {
              handleCellClick({ row: rowInd, column: colInd }, cell.player);
            }}
            cell={cell}
            winnerCombination={winnerCombination}
            isWinningCell={isCellPartOfWinningCombination(cell)}
          />
        );
      })}
    </div>
  );
}

export default RowCompoment;
