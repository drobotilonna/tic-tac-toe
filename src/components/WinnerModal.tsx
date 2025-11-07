import React from "react";
import { Player } from "./models/gameType";

type WinnerModalProps = {
  // TODO: There is a type for it Cells|CellState
  winner: Player | null;
  startNewGame: () => void;
  isBoardFilled: boolean;
};

// TODO: Rename the component. It is no longer modal. It could be called as GameStatus
function WinnerModal({ winner, isBoardFilled, startNewGame }: WinnerModalProps) {
  const isDraw = isBoardFilled && !winner;

  return (
    <div className="winnerCon">
      {winner && (
        <div className={winner !== null ? "endWindow" : "endWindowHidden"}>
          The End! Player:
          <span className={winner == "0" ? "span0" : winner == "X" ? "spanX" : "spanDraw"}>
            {winner}
          </span>
          is the winner
        </div>
      )}
      {isDraw && (
        <div className="endWindow">
          {/* TODO: change the title to "There is a draw!" */}
          <p className="spanDraw">is draw</p>
        </div>
      )}

      {(winner || isDraw) && (
        <button className="newGame" onClick={startNewGame}>
          New Game
        </button>
      )}
    </div>
  );
}

export default WinnerModal;
