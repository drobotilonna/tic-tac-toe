import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {  TurnHistory, GameSettings } from "../models/gameType";

type SettingsProps = {
  // use GameSettings type here
  setSettings: React.Dispatch<
    React.SetStateAction<{
      boardSize: number;
      winCombinationLength: number;
      enableDisappearingMode: boolean;
      amountOfUnDisappearingCells: number;
    }>
  >;
  settings: GameSettings,
  setTurnHistory: React.Dispatch<React.SetStateAction<TurnHistory[]>>;
};


function Settings({
  setSettings,

  settings,

  setTurnHistory,
}: SettingsProps) {
 
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GameSettings>({
    defaultValues: settings,
  });
  const watchedBoardSize = watch("boardSize");
  const watchedWinCombinationLength = watch("winCombinationLength");
 
  const watchedEnableDisappearingMode = watch("enableDisappearingMode");
 

 

  return (
    <div className="settingsCon">
      <h3>Settings:</h3>
      <form
        onSubmit={handleSubmit((data) => {
          
          setSettings(data);
          setTurnHistory([]);
        })}
      >
        <label className="inp" htmlFor="check">
          Turn disappearing:
          <input
            className="check"
            type="checkbox"
            {...register('enableDisappearingMode')}
          />
        </label>

        {watchedEnableDisappearingMode && (
          <label className="inpP" htmlFor="inpAm">
            Amount:
            <input
              min={watchedWinCombinationLength * 2 - 1}
              max={watchedBoardSize * watchedBoardSize - 1}
              type="number"
              {...register('amountOfUnDisappearingCells', {
                min: {
                  value: watchedWinCombinationLength * 2 - 1,
                  // TODO: use English translation here. You can use GPT to help you with this.
                  message:
                    "The number of visible cells cannot be less than the length of the combination.",
                },
                max: {
                  value: watchedBoardSize * watchedBoardSize - 1,
                  // TODO: use English translation here.
                  message:
                    "The number of cells displayed cannot exceed the size of the board. ",
                },
              })}
            />
          </label>
        )}

        <p className="inf">
          {typeof errors.amountOfUnDisappearingCells?.message === 'string' &&
            errors.amountOfUnDisappearingCells.message}
        </p>

        <label className="inpP" htmlFor="inpBoard">
          Board size:
          <input
            min={3}
            max={10}
            type="number"
            {...register('boardSize', {
              min: {
                value: 3,
                message: "The size of the board cannot be less than 3",
              },
              max: {
                value: 10,
                message: "The size of the board cannot be more than 10",
              },
            })}
          />
        </label>

        <p className="inf">
          {' '}
          {typeof errors.boardSize?.message === 'string' &&
            errors.boardSize.message}
        </p>

        <label className="inpP" htmlFor="inpLen">
          Lenght:
          <input
            id="inpLen"
            min={3}
            max={watchedBoardSize}
            type="number"
            {...register('winCombinationLength', {
              min: {
                value: 3,
                message:
                  "The length of the winning combination cannot be less than 3.",
              },
              max: {
                value: watchedBoardSize,
                message:
                  "The length of the winning combination cannot exceed the size of the board.",
              },
            })}
          />
        </label>

        <p className="inf">
          {typeof errors.winCombinationLength?.message === 'string' &&
            errors.winCombinationLength.message}
        </p>

        <button type="submit" className="btn">
          Ok
        </button>
      </form>
    </div>
  );
}

export default Settings;
