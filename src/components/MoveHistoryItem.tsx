
import { TCell} from "../models/gameType";
type HistoryDisplayElementProps = {
  turn: TCell;

  onMoveClick: () => void;
};

function MoveHistoryItem({ turn, onMoveClick }: HistoryDisplayElementProps) {
  return (
    <p>
      Player:{' '}
      <span className={turn.player == 'X' ? 'p' : 'p2'}>{turn.player}</span>
      place {turn.position.row}.{turn.position.column}
      <button
        className="return-btn"
        onClick={() => {
          if (!turn.player) {return}
          onMoveClick();
          
        }}
      >
        Return
      </button>
    </p>
  );
}

export default MoveHistoryItem;
