import React, { useEffect, useState } from "react";
import Square from "./Square";
import { socket } from "@/utils/socket";
import { BoardProps } from "./interfaces";

const Board = (props: BoardProps) => {
  const {
    user,
    opponent,
    turn,
    setTurn,
    isMyTurn,
    setIsMyTurn,
    setBoardTitle,
  } = props;

  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  const chooseSquare = (square: number) => {
    if (isMyTurn && board[square] === "") {
      const newTurn = turn === "X" ? "O" : "X";
      setTurn(newTurn);

      setIsMyTurn(false);

      setBoardTitle(`Opponents Turn (${newTurn})`);

      const boardData = board.map((item: string, index: number) => {
        if (index === square && item === "") {
          return turn;
        }
        return item;
      });

      setBoard(boardData);
      socket.emit("gameplay", newTurn, user, opponent, boardData);
    }
  };

  const handleGameUpdated = (
    turn: any,
    me: any,
    opponent: any,
    boardData: any
  ) => {
    setBoard(boardData);
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  useEffect(() => {
    socket.on("gameplay:updated", handleGameUpdated);

    return () => {
      socket.on("gameplay:updated", handleGameUpdated);
    };
  }, []);

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      console.log(`User ${winner} wins the game!`);

      const winnerUser = isMyTurn ? opponent : user;
      const loserUser = isMyTurn ? user : opponent;
      console.log("Winner is ", winnerUser);
      console.log("Loser is ", loserUser);
    } else {
      console.log("Draw ");
    }
  }, [board]);

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
