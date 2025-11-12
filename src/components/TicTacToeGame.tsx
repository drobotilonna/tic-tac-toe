import React, { use, useEffect, useMemo, useState } from 'react';
import {
  Cells,
  TurnHistory,
  TCell,
  Position,
  CellWidth,
} from '../models/gameType';
import { Player } from '../models/gameType';
import { checkBoardWinner, checkRowWinner } from './helpers/functions';
import {
  verifyIsBoardFilled,
  calculateCells,
  calculateActivePlayer,
  calculateCellStyles,
} from './helpers/helpers';

import Cell from './Cell';
import { write } from 'fs';
import RowCompoment from './Row';
import MovesHistory from './MovesHistory';
import Settings from './Settings';
import GameStatus from './GameStatus';

function TicTacToeGame() {
  const [turnsHistory, setTurnsHistory] = useState<TurnHistory[]>([]);

  // TODO: use GameSettings (if you don't have this type yet -> check comment in Settings.tsx) type here
  const [settings, setSettings] = useState({
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

  function makeMove(position: Position, cell: Cells) {
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

  // TODO: there is a typo in the code. It should be "winnerCombinationLength" instead of "winerCombinationLength".
  const { winner, winerCombinationLength } = useMemo(() => {
    const winnerCombination = checkBoardWinner(
      cells,
      settings.winCombinationLength
    );
    const newComb = winnerCombination?.map((el) => {
      return el.position;
    });

    if (!winnerCombination || !newComb)
      return { winner: null, winerCombinationLength: null };

    return {
      winner: turnsHistory[turnsHistory.length - 1].player,
      winerCombinationLength: newComb,
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
            <RowCompoment
              key={rowInd}
              row={row}
              rowInd={rowInd}
              cellSize={cellWidth}
              handleCellClick={makeMove}
              winnerCombination={winerCombinationLength}
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
