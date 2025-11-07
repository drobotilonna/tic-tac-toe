import React, { useState } from "react";
import { useForm, SubmitHandler, Watch } from "react-hook-form";
import { Cell, IsCorrect, TurnHistory } from "./models/gameType";

// TODO: please clear all unused code and comments.
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
type FormValues = {
  boardSize: number;
  winCombinationLength: number;
  enableDisappearingMode: boolean;
  amountOfUnDisappearingCells: number;
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
  const [isCorrect, setIsCorrect] = useState<IsCorrect>({
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
  const watchedBoardSize = watch("boardSize");
  const watchedWinCombinationLength = watch("winCombinationLength");
  const watchedAmountOfUnDisappearingCells = watch("amountOfUnDisappearingCells");
  const watchedEnableDisappearingMode = watch("enableDisappearingMode");
  // const [elBoard, setElBoard] = useState<number>();
  // const [elLeng, setElLeng] = useState<number>();

  function validateInp() {
    let errors: IsCorrect = {
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
      if (formData.winCombinationLength > formData.boardSize || formData.winCombinationLength < 3) {
        errors.winCombinationLength =
          "Довжина комбінації для виграшу не може бути більшою за розмір доски і менша за 3";
        isValid = false;
      }
    }
    if (settings.enableDisappearingMode) {
      if (
        formData.amountOfUnDisappearingCells > formData.boardSize * formData.boardSize - 1 ||
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
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setSettings(data);
          setTurnHistory([]);
        })}
      >
        <label className="inp" htmlFor="check">
          {" "}
          Turn disappearing:
          <input
            className="check"
            // onChange={() => {
            //   check();
            // }}
            //checked={settings.enableDisappearingMode}
            type="checkbox"
            // name=""
            // id="check"
            {...register("enableDisappearingMode")}
          />
        </label>
        {watchedEnableDisappearingMode && (
          <label className="inpP" htmlFor="inpAm">
            Amount:
            <input
              // id="inpAm"
              min={watchedWinCombinationLength * 2 - 1}
              max={watchedBoardSize * watchedBoardSize - 1}
              // className="setInputs"
              type="number"
              // placeholder="Write ..."
              // onChange={(el) => {
              //   //setElBoard(Number(el.target.value));
              //   setFormData((prev) => ({
              //     ...prev,
              //     amountOfUnDisappearingCells: Number(el.target.value),
              //   }));
              // }}
              {...register("amountOfUnDisappearingCells", {
                min: {
                  value: watchedWinCombinationLength * 2 - 1,
                  message:
                    "Кількість висвітлюваних клітинок не може бути  менша за довжину комбінації",
                },
                max: {
                  value: watchedBoardSize * watchedBoardSize - 1,
                  message:
                    "Кількість висвітлюваних клітинок не може бути не може бути більшою за розмір доски ",
                },
              })}
            />
          </label>
        )}
        <p className="inf">
          {typeof errors.amountOfUnDisappearingCells?.message === "string" &&
            errors.amountOfUnDisappearingCells.message}
        </p>
        {/* {(isCorrect.amountOfUnDisappearingCells&&settings.enableDisappearingMode) && <p className="inf">{isCorrect.amountOfUnDisappearingCells}</p>} */}

        <label className="inpP" htmlFor="inpBoard">
          Board size:
          <input
            // id="inpBoard"
            min={3}
            max={10}
            // className="setInputs"
            type="number"
            // placeholder="Write board size"
            // onChange={(el) => {
            //   //setElBoard(Number(el.target.value));
            //   setFormData((prev) => ({
            //       ...prev,
            //       boardSize: Number(el.target.value),
            //     }));
            // }}
            {...register("boardSize", {
              min: {
                value: 3,
                message: "Pозмір доски не може бути  меншим 3",
              },
              max: {
                value: 10,
                message: "Pозмір доски не може бути більшим 10",
              },
            })}
          />
        </label>
        {/* {isCorrect.boardSize && <p className="inf">{isCorrect.boardSize}</p>} */}

        {/* {elLeng&&elLeng>10?<p>"Error"</p>:""} */}
        <p className="inf">
          {" "}
          {typeof errors.boardSize?.message === "string" && errors.boardSize.message}
        </p>

        <label className="inpP" htmlFor="inpLen">
          Lenght:
          <input
            id="inpLen"
            min={3}
            max={watchedBoardSize}
            // className="setInputs"
            type="number"
            // placeholder="Write winner combination lenght"
            // onChange={(el) => {
            //   //setElLeng(Number(el.target.value));
            //   setFormData((prev) => ({
            //       ...prev,
            //       winCombinationLength: Number(el.target.value),
            //     }));

            // }}
            {...register("winCombinationLength", {
              min: {
                value: 3,
                message: "Довжина комбінації для виграшу не може бути  менша за 3",
              },
              max: {
                value: watchedBoardSize,
                message: "Довжина комбінації для виграшу не може бути більшою за розмір доски",
              },
            })}
          />
        </label>
        {/* {isCorrect.winCombinationLength && <p className="inf">{}</p>} */}
        <p className="inf">
          {typeof errors.winCombinationLength?.message === "string" &&
            errors.winCombinationLength.message}
        </p>
        {}

        <button
          type="submit"
          // onClick={() => {
          //   console.log(settings.enableDisappearingMode,"aaaaaaa")
          //   if (formData.winCombinationLength && formData.boardSize && validateInp()) {
          //     //setWinCombinationLength(elLeng);
          //     setSettings((prev) => ({
          //       ...prev,
          //       boardSize: formData.boardSize,
          //       winCombinationLength: formData.winCombinationLength,
          //       amountOfUnDisappearingCells: formData.amountOfUnDisappearingCells

          //     }));

          //     //setBoardSize(elBoard);
          //     setTurnHistory([]);
          //   }
          // }}
          className="btn"
        >
          Ok
        </button>
      </form>
    </div>
  );
}

export default Settins;
