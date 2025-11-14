import React, { use, useEffect, useMemo, useState } from 'react';
import { checkBoardWinner, checkRowWinner } from './functions';

import {
  Cells,
  TurnHistory,
  TCell,
  Position,
  CellWidth,
} from '../../models/gameType';
import { Player } from '../../models/gameType';

//
// TODO: move all functions to the new file in the helpers folder and name it as the function name.
export const verifyIsBoardFilled = (
  turnsHistory: TurnHistory[],
  boardSize: number
) => {
  return turnsHistory.length == boardSize * boardSize;
};

// TODO: what is this? What this code is for?
const rowIndex = 1;
const row = [0, 1, 2];
const newRow: TCell[] = row.map((el) => {
  return { player: null, position: { row: rowIndex, column: el } };
});

export const createArrayByLength = (length: number) => {
  return Array.from({ length }, (el, index) => index);
};

export const calculateCells = (
  turnsHistory: TurnHistory[],
  boardSize: number
) => {
  const initialCells: TCell[][] = createArrayByLength(boardSize).map(
    // TODO: we don't need ind here. It is unused
    (el, ind) => {
      const row = createArrayByLength(boardSize);
      return row.map((col) => {
        return { player: null, position: { row: el, column: col } };
      });
    }
  );

  turnsHistory.forEach((turn) => {
    console.log(turn, 'turn');

    initialCells[turn.position.row][turn.position.column] = {
      player: turn.player,
      position: turn.position,
    };

    console.log(initialCells, 'initialCells');
  });

  return initialCells;
};
export const calculateCellStyles = (boardSize: number) => {
  const width = (490 - 15 * (boardSize - 1)) / boardSize;
  const fontSize = 110 - boardSize * boardSize;
  return {
    width,
    fontSize,
  };
};

export const calculateActivePlayer = (turnsHistory: TCell[]): Player => {
  if (!turnsHistory.length) return 'X';

  const lastPlayer = turnsHistory[turnsHistory.length - 1].player;
  return lastPlayer === 'X' ? '0' : 'X';
};
