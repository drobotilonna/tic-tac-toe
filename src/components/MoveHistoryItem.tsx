import React from 'react';
import { Cell, Position, Player, TurnHistory } from '../models/gameType';
type HistoryDisplayElementProps = {
  turn: Cell;

  onMoveClick: () => void;
};

function MoveHistoryItem({
  turn,

  onMoveClick,
}: HistoryDisplayElementProps) {
  return (
    <p>
      Player:{' '}
      <span className={turn.player == 'X' ? 'p' : 'p2'}>{turn.player}</span>
      place {turn.position.row}.{turn.position.column}
      <button
        className="return-btn"
        onClick={() => {
          if (turn.player) {
            onMoveClick();
          }

          console.log(turn.player, 'player');
        }}
      >
        Return
      </button>
    </p>
  );
}

export default MoveHistoryItem;
