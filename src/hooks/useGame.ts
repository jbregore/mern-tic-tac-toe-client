import { UserProps } from "@/zustand/interfaces";
import React, { useState } from "react";

const useGame = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [opponent, setOpponent] = useState<UserProps>({
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "online",
  });

  const [boardTitle, setBoardTitle] = useState("");
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [turn, setTurn] = useState("X");

  return {
    isGameStarted,
    setIsGameStarted,
    opponent,
    setOpponent,
    boardTitle,
    setBoardTitle,
    isMyTurn,
    setIsMyTurn,
    turn,
    setTurn,
  };
};

export default useGame;
