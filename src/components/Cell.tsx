import React from 'react';
import { TCell, CellWidth, Position } from '../models/gameType';
type CellComponentProps = {
  colInd: number;
  rowInd: number;
  cellSize: CellWidth;
  onCellClick: () => void;
  cell: TCell;
  winnerCombination: Position[] | null;
  isWinningCell: boolean | undefined;
};

function Cell({
  colInd,
  rowInd,
  cellSize,
  onCellClick,
  cell,
  winnerCombination,
  isWinningCell,
}: CellComponentProps) {
  return (
    <div
      style={{
        width: cellSize.width,
        height: cellSize.width,
        fontSize: cellSize.width,
        ...(winnerCombination?.includes(cell.position)
          ? { color: 'green' }
          : {}),
      }}
      className={cell.player == 'X' ? 'd' : 'd2'}
      onClick={() => {
        onCellClick();
      }}
    >
      {cell.player}
    </div>
  );
}

export default Cell;
