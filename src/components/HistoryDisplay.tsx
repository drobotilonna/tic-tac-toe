import React from "react";
import { Cell, Player, Position } from "./models/gameType";
import HistoryDisplayElement from "./HistoryDisplayElement";

type HistoryDisplayProps = {
  turnsHistory: Cell[];
  returnToMove: (pos: Position, player: Player) => void;
  //  setWinnerCombination: React.Dispatch<React.SetStateAction<Position[] | null>>;
};

// TODO: rename it to History|MovesHistory.
function HistoryDisplay({ turnsHistory, returnToMove }: HistoryDisplayProps) {
  return (
    <div className="historyDisplay">
      <h3>History of moves:</h3>

      {turnsHistory.map((turn: Cell, ind: number) => (
        <HistoryDisplayElement
          // TODO: key property should be provided. You can use turn position to create a key.
          // Like: `${turn.position.row}-${turn.position.column}`
          turn={turn}
          ind={ind}
          returnToMove={returnToMove}
        />
      ))}
    </div>
  );
}

export default HistoryDisplay;
