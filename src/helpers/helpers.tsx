import { TurnHistory, TCell } from "../models/gameType";
import { Player } from "../models/gameType";





export function getNullArray(amount: number): null[] {
  const nullArr = Array(amount).fill(null);
  return nullArr;
}
