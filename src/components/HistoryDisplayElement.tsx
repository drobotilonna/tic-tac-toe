import React from "react";
import { Cell, Position, Player } from "./models/gameType";

type HistoryDisplayElementProps = {
  // TODO: add a type for turn. Don;t use any
  turn: any;
  // TODO: you don't need ind prop.
  ind: number;
  // TODO: rename it to onMoveClick.
  // I like the way you use in Cell component.
  // So the props for a function is provided in parent component. And on child component you just call the function without any arguments.
  // Why this approach is better?
  // 1) Because it is more readable and easier to understand - the child component doesn't need to know what data to pass.
  // 2) It is more flexible - the parent component can create a closure that captures any context it needs, allowing different implementations when the component is reused.
  returnToMove: (pos: Position, player: Player) => void;
};

// TODO: rename it to MoveHistoryItem.
function HistoryDisplayElement({ turn, ind, returnToMove }: HistoryDisplayElementProps) {
  return (
    <p>
      Player: <span className={turn.player == "X" ? "p" : "p2"}>{turn.player}</span>
      place {turn.place.row}.{turn.place.column}
      <button
        className="return-btn"
        onClick={() => {
          returnToMove({ row: turn.place.row, column: turn.place.column }, turn.player);
          //setWinnerCombination(null);
          console.log(turn.player, "player");
        }}
      >
        Return
      </button>
    </p>
  );
}

export default HistoryDisplayElement;
