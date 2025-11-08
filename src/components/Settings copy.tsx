import React, { useState } from "react";
import { Cell,FormValue,  TurnHistory } from "../models/gameType";

type SettingsProps = {
  //enableDisappearingMode: boolean;
  check: () => void;

  //setWinCombinationLength: React.Dispatch<React.SetStateAction<number>>;
  //setBoardSize: React.Dispatch<React.SetStateAction<number>>;
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

function Settins({
  check,
  //enableDisappearingMode,
  setSettings,
  //setBoardSize,
  settings,
  //setWinCombinationLength,
  setTurnHistory,
}: SettingsProps) {
  const [isCorrect, setIsCorrect] = useState<FormValue>({
    boardSize: null,
    winCombinationLength: null,
    amountOfUnDisappearingCells: null,
  });
  const [formData, setFormData] = useState(settings);
  // const [elBoard, setElBoard] = useState<number>();
  // const [elLeng, setElLeng] = useState<number>();

  function validateInp() {
    let errors: FormValue = {
      boardSize: null,
      winCombinationLength: null,
      amountOfUnDisappearingCells: null,
    };
    let isValid = true;
    if (formData.boardSize && formData.winCombinationLength) {
      if (formData.boardSize > 10 || formData.boardSize < 3) {
        errors.boardSize = "Pозмір доски не може бути більшим 10 i меншим 3";
        isValid = false;
      }
      if (
        formData.winCombinationLength > formData.boardSize ||
        formData.winCombinationLength < 3
      ) {
        errors.winCombinationLength =
          "Довжина комбінації для виграшу не може бути більшою за розмір доски і менша за 3";
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
          "Кількість висвітлюваних клітинок не може бути більшою за розмір доски і менша за довжину комбінації";
        isValid = false;
      }
    }

    setIsCorrect(errors);
    return isValid;
  }

  return (
    <div className="settingsCon">
      <h3>Settings:</h3>

      <label className="inp" htmlFor="check">
        {" "}
        Turn disappearing:
        <input
          className="check"
          onChange={() => {
            check();
          }}
          checked={settings.enableDisappearingMode}
          type="checkbox"
          name=""
          id="check"
        />
      </label>
      {settings.enableDisappearingMode && (
        <label className="inpP" htmlFor="inpAm">
          Amount:
          <input
            id="inpAm"
            min={
              formData.winCombinationLength + formData.winCombinationLength - 1
            }
            max={formData.boardSize + formData.boardSize - 1}
            className="setInputs"
            type="number"
            placeholder="Write ..."
            onChange={(el) => {
              
              setFormData((prev) => ({
                ...prev,
                amountOfUnDisappearingCells: Number(el.target.value),
              }));
            }}
          />
        </label>
      )}
      {isCorrect.amountOfUnDisappearingCells &&
        settings.enableDisappearingMode && (
          <p className="inf">{isCorrect.amountOfUnDisappearingCells}</p>
        )}

      <label className="inpP" htmlFor="inpBoard">
        Board size:
        <input
          id="inpBoard"
          min={1}
          max={10}
          className="setInputs"
          type="number"
          placeholder="Write board size"
          onChange={(el) => {
            
            setFormData((prev) => ({
              ...prev,
              boardSize: Number(el.target.value),
            }));
          }}
        />
      </label>
      {isCorrect.boardSize && <p className="inf">{isCorrect.boardSize}</p>}



      <label className="inpP" htmlFor="inpLen">
        Lenght:
        <input
          id="inpLen"
          min={1}
          max={formData.boardSize}
          className="setInputs"
          type="number"
          placeholder="Write winner combination lenght"
          onChange={(el) => {
            
            setFormData((prev) => ({
              ...prev,
              winCombinationLength: Number(el.target.value),
            }));
          }}
        />
      </label>
      {isCorrect.winCombinationLength && (
        <p className="inf">{isCorrect.winCombinationLength}</p>
      )}
      {}

      <button
        onClick={() => {
          console.log(settings.enableDisappearingMode, "aaaaaaa");
          if (
            formData.winCombinationLength &&
            formData.boardSize &&
            validateInp()
          ) {
          
            setSettings((prev) => ({
              ...prev,
              boardSize: formData.boardSize,
              winCombinationLength: formData.winCombinationLength,
              amountOfUnDisappearingCells: formData.amountOfUnDisappearingCells,
            }));

            
            setTurnHistory([]);
          }
        }}
        className="btn"
      >
        Ok
      </button>
    </div>
  );
}

export default Settins;
