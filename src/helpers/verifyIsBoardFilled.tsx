import { TurnHistory, TCell } from "../models/gameType";


export const verifyIsBoardFilled = (
  turnsHistory: TurnHistory[],
  boardSize: number
) => {
  return turnsHistory.length == boardSize * boardSize;
};
