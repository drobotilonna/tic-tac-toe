import React from "react";
import { Cells, Player } from "../models/gameType";
type WinnerModalProps = {
  winner: Cells;
  startNewGame: () => void;
  isBoardFilled: boolean;
};

function GameStatus({ winner, isBoardFilled, startNewGame }: WinnerModalProps) {
  const isDraw = isBoardFilled && !winner;

  return (
    <div className="winnerCon">
      {winner && (
        <div className={winner !== null ? "endWindow" : "endWindowHidden"}>
          The End! Player:
          <span
            className={
              winner == "0" ? "span0" : winner == "X" ? "spanX" : "spanDraw"
            }
          >
            {winner}
          </span>
          is the winner
        </div>
      )}
      {isDraw && (
        <div className="endWindow">
          <p className="spanDraw">There is a draw!</p>
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

export default GameStatus;
