import React, { useState } from "react";
import Button from "../buttons/Button";
import { GameProps } from "./interfaces";
import Board from "./Board";

const Game = (props: GameProps) => {
  const { stopGame } = props;
  const [isStop, setIsStop] = useState(false);
  return (
    <div className="w-full ">
      <Board />
      <div className="flex justify-center items-center">
        {!isStop ? (
          <>
            <div className="md:w-40">
              <Button
                onClick={() => setIsStop(true)}
                title="Stop"
                style="text-white bg-red-600 w-full"
                type="button"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full space-x-4 justify-center items-center">
              <div className="w-52">
                <Button
                  onClick={() => setIsStop(false)}
                  title="Continue"
                  style="text-white bg-blue-600 w-full"
                  type="button"
                />
              </div>

              <div className="w-52">
                <Button
                  onClick={stopGame}
                  title="Back to main menu"
                  style="text-white bg-green-600 w-full"
                  type="button"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
