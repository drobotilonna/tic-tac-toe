import React from 'react';
import { TCell, CellWidth, Position } from '../models/gameType';

// TODO: remove all unused props from the component. (use isWinningCell not winnerCombination)
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
        // TODO: create a new class - "cell-winner". Check the next comment for more details.
        // TODO: use isWinningCell instead of winnerCombination
        ...(winnerCombination?.includes(cell.position)
          ? { color: 'green' }
          : {}),
      }}
      // TODO: it is not correct way of doing it. How it should be done?
      // there should be a class with common styles that could be assigned to all cells.
      // and there should be few classes for different states of the cell.
      // for example: "cell" class for common styles and "cell-x" class for x cell and "cell-o" class for o cell.
      // className={`cell ${cell.player == 'X' ? 'cell-x' : ''} ${cell.player == '0' ? 'cell-o' : ''}`}
      // BUT there is a library like classnames OR clsx that could be used to combine classes. like this:
      // className={clsx('cell', {
      //   'cell-x': cell.player == 'X',
      //   'cell-o': cell.player == '0',
      // })}
      // SO USE clsx library to combine classes.
      className={cell.player == 'X' ? 'd' : 'd2'}
      // TODO: make it as a 1 row onClick={onCellClick}
      onClick={() => {
        onCellClick();
      }}
    >
      {cell.player}
    </div>
  );
}

export default Cell;
