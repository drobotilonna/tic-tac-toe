import React, { useState } from 'react';
import { useForm, SubmitHandler, Watch } from 'react-hook-form';
import { Cell, TurnHistory, FormValue } from '../models/gameType';

type SettingsProps = {
  setSettings: React.Dispatch<
    React.SetStateAction<{
      boardSize: number;
      winCombinationLength: number;
      enableDisappearingMode: boolean;
      amountOfUnDisappearingCells: number;
    }>
  >;
  settings: {
    boardSize: number;
    winCombinationLength: number;
    enableDisappearingMode: boolean;
    amountOfUnDisappearingCells: number;
  };
  setTurnHistory: React.Dispatch<React.SetStateAction<TurnHistory[]>>;
};
type FormValues = {
  boardSize: number;
  winCombinationLength: number;
  enableDisappearingMode: boolean;
  amountOfUnDisappearingCells: number;
};

function Settings({
  setSettings,

  settings,

  setTurnHistory,
}: SettingsProps) {
  const [isCorrect, setIsCorrect] = useState<FormValue>({
    boardSize: null,
    winCombinationLength: null,
    amountOfUnDisappearingCells: null,
  });
  const [formData, setFormData] = useState(settings);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: settings,
  });
  const watchedBoardSize = watch('boardSize');
  const watchedWinCombinationLength = watch('winCombinationLength');
  const watchedAmountOfUnDisappearingCells = watch(
    'amountOfUnDisappearingCells'
  );
  const watchedEnableDisappearingMode = watch('enableDisappearingMode');
  function check() {
    setSettings((prev) => ({
      ...prev,
      enableDisappearingMode: !prev.enableDisappearingMode,
    }));
  }

  function validateInp() {
    let errors: FormValue = {
      boardSize: null,
      winCombinationLength: null,
      amountOfUnDisappearingCells: null,
    };
    let isValid = true;
    if (formData.boardSize && formData.winCombinationLength) {
      if (formData.boardSize > 10 || formData.boardSize < 3) {
        errors.boardSize = 'Pозмір доски не може бути більшим 10 i меншим 3';
        isValid = false;
      }
      if (
        formData.winCombinationLength > formData.boardSize ||
        formData.winCombinationLength < 3
      ) {
        errors.winCombinationLength =
          'Довжина комбінації для виграшу не може бути більшою за розмір доски і менша за 3';
        isValid = false;
      }
    }
    if (settings.enableDisappearingMode) {
      if (
        formData.amountOfUnDisappearingCells >
          formData.boardSize * formData.boardSize - 1 ||
        formData.amountOfUnDisappearingCells <
          formData.winCombinationLength + formData.winCombinationLength - 1
      ) {
        errors.amountOfUnDisappearingCells =
          'Кількість висвітлюваних клітинок не може бути більшою за розмір доски і менша за довжину комбінації';
        isValid = false;
      }
    }

    setIsCorrect(errors);
    return isValid;
  }

  return (
    <div className="settingsCon">
      <h3>Settings:</h3>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setSettings(data);
          setTurnHistory([]);
        })}
      >
        <label className="inp" htmlFor="check">
          {' '}
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
                  message:
                    'Кількість висвітлюваних клітинок не може бути  менша за довжину комбінації',
                },
                max: {
                  value: watchedBoardSize * watchedBoardSize - 1,
                  message:
                    'Кількість висвітлюваних клітинок не може бути не може бути більшою за розмір доски ',
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
                message: 'Pозмір доски не може бути  меншим 3',
              },
              max: {
                value: 10,
                message: 'Pозмір доски не може бути більшим 10',
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
                  'Довжина комбінації для виграшу не може бути  менша за 3',
              },
              max: {
                value: watchedBoardSize,
                message:
                  'Довжина комбінації для виграшу не може бути більшою за розмір доски',
              },
            })}
          />
        </label>

        <p className="inf">
          {typeof errors.winCombinationLength?.message === 'string' &&
            errors.winCombinationLength.message}
        </p>
        {}

        <button type="submit" className="btn">
          Ok
        </button>
      </form>
    </div>
  );
}

export default Settings;
