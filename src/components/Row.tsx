import React from 'react';
import { TCell, CellWidth, Position, Player } from '../models/gameType';
import Cell from './Cell';
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
