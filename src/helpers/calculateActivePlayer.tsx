import { TurnHistory, TCell } from "../models/gameType";
import { Player } from "../models/gameType";





export const calculateActivePlayer = (turnsHistory: TCell[]): Player => {
  if (!turnsHistory.length) return "X";

  const lastPlayer = turnsHistory[turnsHistory.length - 1].player;
  return lastPlayer === "X" ? "0" : "X";
};