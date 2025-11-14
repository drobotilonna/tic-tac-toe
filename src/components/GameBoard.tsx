
import { TCell, CellWidth, Position, Player } from "../models/gameType";
import Cell from "./Cell";
type RowComponentProps = {
  rowInd: number;
  cellSize: CellWidth;
  handleCellClick: (pos: Position, player: Player | null) => void;

  winnerCombination: Position[] | null;
  board: TCell[];
};

function GameBoard({
  
  cellSize,
  handleCellClick,
  winnerCombination,
  board,
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
      {board.map((cell, colInd) => {
        return (
          <Cell
            key={cell.position.column}
           
            cellSize={cellSize}
            onCellClick={() => {
              handleCellClick({ row: cell.position.row, column: colInd }, cell.player);
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

export default GameBoard;
