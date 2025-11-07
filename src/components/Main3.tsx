import React, { use, useEffect, useMemo, useState } from "react";
import { Cells, TurnHistory, Cell, Position, CellWidth } from "./models/gameType";
import { Player } from "./models/gameType";
import { checkBoardWinner, checkRowWinner } from "./functions";
import "./main.css";
import CellComponent from "./Cell";
import RowCompoment from "./RowCompoment";
import HistoryDisplay from "./HistoryDisplay";
import Settins from "./Settings";
import WinnerModal from "./WinnerModal";

// TODO:
// 1) clear all comments.
// 2) Remove all unused code.
// 3) Move all functions to a helpers file/helpers folder. (It is ok to have a helper function in the component file, but only if there is a single one or at most 2. In this case, we have many functions and it is not a good idea to keep them in the component file.)

// const calculateIsDraw = (cells: Cell[], winner: Player | null) => {
//   const playerArray = cells.map((el) => {
//     return el.player;
//   });

//   console.log(playerArray, "playerArray");
//   const isBoardFilled = !playerArray.includes(null);
//   const isDraw = !winner && isBoardFilled;
//   return isDraw;
// };
const verifyIsBoardFilled = (turnsHistory: TurnHistory[], boardSize: number) => {
  return turnsHistory.length == boardSize * boardSize;
};
const rowIndex = 1;
const row = [0, 1, 2];
const newRow: Cell[] = row.map((el) => {
  return { player: null, place: { row: rowIndex, column: el } };
});

const createArrayByLength = (length: number) => {
  return Array.from({ length }, (el, index) => index);
};

const calculateCells = (turnsHistory: TurnHistory[], boardSize: number) => {
  const initialCells: Cell[][] = createArrayByLength(boardSize).map((el, ind) => {
    const row = createArrayByLength(boardSize);
    return row.map((col) => {
      return { player: null, place: { row: el, column: col } };
    });
  });

  turnsHistory.forEach((turn) => {
    console.log(turn, "turn");

    initialCells[turn.place.row][turn.place.column] = {
      player: turn.player,
      place: turn.place,
    };

    console.log(initialCells, "initialCells");
  });

  return initialCells;
};

// TODO: rename to calculateCellStyles OR getCellStyles
const cellWidthCountig = (boardSize: number) => {
  const divWith = (490 - 15 * (boardSize - 1)) / boardSize;
  const fontSize = 110 - boardSize * boardSize;
  return {
    divWith,
    fontSize,
  };
};

// TODO: make this function more compact
const calculateActivePlayer = (turnsHistory: Cell[]): Player => {
  // TODO: if (!turnsHistory.length) return "X";
  if (!turnsHistory.length) {
    return "X";
  }

  // TODO:
  // const lastPlayer = turnsHistory[turnsHistory.length - 1].player;
  // return lastPlayer === "X" ? "0" : "X";
  if (turnsHistory[turnsHistory.length - 1].player === "X") {
    return "0";
  } else {
    return "X";
  }
};

// TODO: rename the file and the component to TicTacToeGame
function Main() {
  const [turnsHistory, setTurnsHistory] = useState<TurnHistory[]>([]);

  console.log(turnsHistory, "TurnsHistory02");
  //  const [winner, setWinner] = useState<Player | null>(null);
  //const [winnerCombination, setWinnerCombination] = useState<Position[] | null>(null);
  // TODO: create a constant for the default config outside of the component. and pass it here.
  const [settings, setSettings] = useState({
    boardSize: 3,
    winCombinationLength: 3,
    enableDisappearingMode: false,
    amountOfUnDisappearingCells: 5,
  });
  // const [winCombinationLength, setWinCombinationLength] = useState(3);
  // const [boardSize, setBoardSize] = useState(3);

  // const cells = calculateCells(turnsHistory, settings.boardSize);
  const cells = useMemo(() => {
    return calculateCells(turnsHistory, settings.boardSize);
  }, [turnsHistory, settings.boardSize]);
  const activePlayer = calculateActivePlayer(turnsHistory);

  // TODO: cellArray is unused. So remove all related code.
  let cellArray: Cell[] = [];
  cells.forEach((el) => {
    el.forEach((el1) => {
      cellArray = [...cellArray, el1];
    });
  });
  console.log(cellArray, "cell");

  // //  const [enableDisappearingMode, setEnableDisappearingMode] =
  //     useState<boolean>(false);
  // TODO: winnerComb is unused. So remove all related code.
  let winnerComb: Position[] = [];
  const cellWidth: CellWidth = cellWidthCountig(settings.boardSize);

  // TODO: this function doesn't make any sense. Just use checkBoardWinner directly.
  // So remove this function and use checkBoardWinner instead.
  function getGameWinner(cellsList: Cell[][]) {
    const isWinner = checkBoardWinner(cellsList, settings.winCombinationLength);
    // if (isWinner) {
    //   const lastMove = isWinner[0].player;

    //   setWinner(lastMove);
    // } else {
    //   setWinner(null);
    // }

    const newComb = isWinner?.map((el) => {
      return el.place;
    });
    // if (newComb != undefined) {
    //   setWinnerCombination(newComb);
    // }

    console.log(winnerComb, "winnerComb");

    return isWinner;
  }

  // TODO: we have 2 separate useMemo to calculate winnerCombination AND winner. But they do the same thing.
  // So merge them to the single useMemo. And return the winner and winnerCombination from the useMemo.
  const winnerCombination: Position[] | null = useMemo(() => {
    // TODO: there is a constant cells. just use it instead of calculating it again.
    const newCells = calculateCells(turnsHistory, settings.boardSize);
    // TODO: the name of variable is incorrect. It should be called as winnerCombination.
    const isWinner = checkBoardWinner(newCells, settings.winCombinationLength);
    const newComb = isWinner?.map((el) => {
      return el.place;
    });

    // TODO:
    // 1) always use === instead of == AND !== instead of !=
    // 2) It is better to return null directly if newComb is undefined or null. Like: if (!newComb) return null;
    // 3) ALSO make it more compact. Like: if (!newComb) return null;
    // 4) this check should be moved to be right bellow the  isWinner|winnerCombination constant.
    // So if the winnerCombination === null we don't need to make any actions
    if (newComb != undefined) {
      return newComb;
    }
    return null;
  }, [turnsHistory]);

  // TODO: the name of the function is incorrect. It should be called as makeMove.
  function changePole(position: Position, cell: Cells) {
    // TODO:
    // 1) use some instead of find
    // 2) rename the variable to isCellAlreadyFilled
    const turnsHistoryEl = turnsHistory.find((el: any) => {
      return el.place.column == position.column && el.place.row == position.row;
    });
    // TODO: make it compact
    if (turnsHistoryEl || winner) {
      return;
    }

    setTurnsHistory((prev: any) => {
      // TODO: make it as a const instead of the let.
      let newHistory = [...prev, { place: position, player: activePlayer }];

      // TODO: newHistory.length > settings.amountOfUnDisappearingCells condition is not needed.
      if (
        settings.enableDisappearingMode &&
        newHistory.length > settings.amountOfUnDisappearingCells
      ) {
        // TODO:
        // 1) do not change newHistory variable. Just return the value of the slice.
        // 2) you can pass to slice "-settings.amountOfUnDisappearingCells" instead of "newHistory.length - settings.amountOfUnDisappearingCells"
        newHistory = newHistory.slice(newHistory.length - settings.amountOfUnDisappearingCells);
        console.log(newHistory, "newHistory");
      }

      return newHistory;
    });
  }

  // TODO: this useEffect do nothing. So remove it.
  useEffect(() => {
    const newCells = calculateCells(turnsHistory, settings.boardSize);

    getGameWinner(newCells);
  }, [turnsHistory]);

  // TODO: we have 2 separate useMemo to calculate winnerCombination AND winner. But they do the same thing.
  // So merge them to the single useMemo. And return the winner and winnerCombination from the useMemo.
  const winner = useMemo(() => {
    const gameWinner = getGameWinner(cells);
    if (gameWinner) {
      return turnsHistory[turnsHistory.length - 1].player;
    }
    return null;
  }, [turnsHistory, cells]);

  const isBoardFilled = verifyIsBoardFilled(turnsHistory, settings.boardSize);

  function returnToMove(place: Position, player: Player) {
    const returnMoves = [];

    for (let i = 0; i < turnsHistory.length; i++) {
      returnMoves.push(turnsHistory[i]);
      if (
        turnsHistory[i].place.column === place.column &&
        turnsHistory[i].place.row === place.row
      ) {
        break;
      }
    }

    return setTurnsHistory(returnMoves);
  }

  // TODO: this function is unused. It is passed to the child component but it is not used there. Remove it.
  function check() {
    setSettings((prev) => ({
      ...prev,
      enableDisappearingMode: !prev.enableDisappearingMode,
    }));
    // setEnableDisappearingMode((prev) => !prev);
  }
  function startNewGame() {
    //setWinner(null);

    //setWinnerCombination(null);
    setTurnsHistory([]);
  }

  return (
    <div className="display">
      <div className="left-div">
        <Settins
          // enableDisappearingMode={enableDisappearingMode}
          //setWinCombinationLength={setWinCombinationLength}
          setSettings={setSettings}
          // setBoardSize={setBoardSize}
          settings={settings}
          check={() => check()}
          setTurnHistory={setTurnsHistory}
        />
        <HistoryDisplay
          turnsHistory={turnsHistory}
          //setWinnerCombination={setWinnerCombination}
          returnToMove={returnToMove}
        />
      </div>

      <div className="right-div">
        <div className="con">
          {cells.map((row, rowInd) => (
            <RowCompoment
              // TODO: key property should be provided. You can use rowInd as a key.
              row={row}
              rowInd={rowInd}
              cellSize={cellWidth}
              changePole={changePole}
              winnerCombination={winnerCombination}
            />
          ))}
        </div>

        {/* {isDraw && <p>Draw!</p>} */}
        <WinnerModal isBoardFilled={isBoardFilled} winner={winner} startNewGame={startNewGame} />
      </div>
    </div>
  );
}

export default Main;
