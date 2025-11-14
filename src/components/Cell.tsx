import { clsx } from 'clsx';
import { TCell, CellWidth, Position } from "../models/gameType";
type CellComponentProps = {
  
  cellSize: CellWidth;
  onCellClick: () => void;
  cell: TCell;
  winnerCombination: Position[] | null;
  isWinningCell: boolean | undefined;
};

function Cell({
  
  cellSize,
  onCellClick,
  cell,
  isWinningCell,
}: CellComponentProps) {
  return (
    <div
      style={{
        width: cellSize.width,
        height: cellSize.width,
        fontSize: cellSize.width,
        ...(isWinningCell
          ? { color: "green" }
          : {}),
      }}
      
       className={clsx('cell', {
        'cell-x': cell.player == 'X',
        'cell-o': cell.player == '0',
      })}
      onClick={() => {onCellClick()}}
    >
      {cell.player}
    </div>
  );
}

export default Cell;
