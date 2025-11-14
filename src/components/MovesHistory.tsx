
import { TCell, Player, Position } from "../models/gameType";
import MoveHistoryItem from "./MoveHistoryItem";
type HistoryDisplayProps = {
  turnsHistory: TCell[];
  onMoveClick: (pos: Position, player: Player) => void;
};

function MovesHistory({ turnsHistory, onMoveClick }: HistoryDisplayProps) {
  return (
    <div className="historyDisplay">
      <h3>History of moves:</h3>

      {turnsHistory.map((turn: TCell, ind: number) => (
        <MoveHistoryItem
          turn={turn}
          key={`${turn.position.column}-${turn.position.row}`}
          onMoveClick={() => {
            onMoveClick(
              { row: turn.position.row, column: turn.position.column },
              turn.player!
            );
          }}
        />
      ))}
    </div>
  );
}

export default MovesHistory;
