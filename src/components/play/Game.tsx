import React, { useState } from "react";
import Button from "../buttons/Button";
import { GameProps } from "./interfaces";
import Board from "./Board";

const Game = (props: any) => {
  const {
    boardTitle,
    setBoardTitle,
    opponent,
    user,
    isMyTurn,
    setIsMyTurn,
    turn,
    setTurn,
    firstMover,
    setFirstMover,
  } = props;

  return (
    <div className="w-full ">
      <p className="text-center mb-2 font-semibold">{boardTitle}</p>
      <Board
        boardTitle={boardTitle}
        setBoardTitle={setBoardTitle}
        opponent={opponent}
        user={user}
        isMyTurn={isMyTurn}
        setIsMyTurn={setIsMyTurn}
        turn={turn}
        setTurn={setTurn}
        firstMover={firstMover}
        setFirstMover={setFirstMover}
      />

      {/* <div className="flex justify-center items-center">
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
      </div> */}
    </div>
  );
};

export default Game;
