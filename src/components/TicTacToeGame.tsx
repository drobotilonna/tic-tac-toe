import { useMemo, useState } from "react";
import {
  TurnHistory,
  Position,
  CellWidth,
  GameSettings,
} from "../models/gameType";
import { Player } from "../models/gameType";
import { checkBoardWinner } from "../helpers/checkBoardWinner";


import GameBoard from "./GameBoard";
import MovesHistory from "./MovesHistory";
import Settings from "./Settings";
import GameStatus from "./GameStatus";
import { calculateCells, calculateCellStyles } from "../helpers/cellsCalculatingFunctions";
import { calculateActivePlayer } from "../helpers/calculateActivePlayer";
import { verifyIsBoardFilled } from "../helpers/verifyIsBoardFilled";

function TicTacToeGame() {
  const [turnsHistory, setTurnsHistory] = useState<TurnHistory[]>([]);

  const [settings, setSettings] = useState<GameSettings>({
    boardSize: 3,
    winCombinationLength: 3,
    enableDisappearingMode: false,
    amountOfUnDisappearingCells: 5,
  });

  const cells = useMemo(() => {
    return calculateCells(turnsHistory, settings.boardSize);
  }, [turnsHistory, settings.boardSize]);

  const activePlayer = calculateActivePlayer(turnsHistory);
  const cellWidth: CellWidth = calculateCellStyles(settings.boardSize);

  function makeMove(position: Position) {
    const isCellAlreadyFilled = turnsHistory.some((el: any) => {
      return (
        el.position.column == position.column && el.position.row == position.row
      );
    });
    if (isCellAlreadyFilled || winner) return;

    setTurnsHistory((prev: any) => {
      const newHistory = [
        ...prev,
        { position: position, player: activePlayer },
      ];

      if (
        settings.enableDisappearingMode &&
        newHistory.length > settings.amountOfUnDisappearingCells
      ) {
        return newHistory.slice(-settings.amountOfUnDisappearingCells);
      }

      return newHistory;
    });
  }

  const { winner, winnerCombinationLength } = useMemo(() => {
    const winnerCombination = checkBoardWinner(
      cells,
      settings.winCombinationLength
    );
    const newComb = winnerCombination?.map((el) => {
      return el.position;
    });

    if (!winnerCombination || !newComb)
      return { winner: null, winnerCombinationLength: null };

    return {
      winner: turnsHistory[turnsHistory.length - 1].player,
      winnerCombinationLength: newComb,
    };
  }, [turnsHistory, cells]);

  const isBoardFilled = verifyIsBoardFilled(turnsHistory, settings.boardSize);

  function onMoveClick(place: Position, player: Player) {
    const returnMoves = [];

    for (let i = 0; i < turnsHistory.length; i++) {
      returnMoves.push(turnsHistory[i]);
      if (
        turnsHistory[i].position.column === place.column &&
        turnsHistory[i].position.row === place.row
      )
        break;
    }

    return setTurnsHistory(returnMoves);
  }

  function startNewGame() {
    setTurnsHistory([]);
  }

  return (
    <div className="display">
      <div className="left-div">
        <Settings
          setSettings={setSettings}
          settings={settings}
          setTurnHistory={setTurnsHistory}
        />
        <MovesHistory turnsHistory={turnsHistory} onMoveClick={onMoveClick} />
      </div>

      <div className="right-div">
        <div className="con">
          {cells.map((row, rowInd) => (
            <GameBoard
              key={rowInd}
              board={row}
              rowInd={rowInd}
              cellSize={cellWidth}
              handleCellClick={makeMove}
              winnerCombination={winnerCombinationLength}
            />
          ))}
        </div>

        <GameStatus
          isBoardFilled={isBoardFilled}
          winner={winner}
          startNewGame={startNewGame}
        />
      </div>
    </div>
  );
}

export default TicTacToeGame;
