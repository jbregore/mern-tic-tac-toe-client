import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const chooseSquare = (square: number) => {
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");
      setBoard(
        board.map((item: string, index: number) => {
          if (index === square && item === "") {
            return player;
          }
          return item;
        })
      );
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        <Square onSquareClick={() => chooseSquare(0)} value={board[0]} />
        <Square onSquareClick={() => chooseSquare(1)} value={board[1]} />
        <Square onSquareClick={() => chooseSquare(2)} value={board[2]} />
        <Square onSquareClick={() => chooseSquare(3)} value={board[3]} />
        <Square onSquareClick={() => chooseSquare(4)} value={board[4]} />
        <Square onSquareClick={() => chooseSquare(5)} value={board[5]} />
        <Square onSquareClick={() => chooseSquare(6)} value={board[6]} />
        <Square onSquareClick={() => chooseSquare(7)} value={board[7]} />
        <Square onSquareClick={() => chooseSquare(8)} value={board[8]} />
      </div>
    </div>
  );
};

export default Board;
