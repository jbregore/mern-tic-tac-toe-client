import React from "react";
import { SquareProps } from "./interfaces";

const Square = (props: SquareProps) => {
  const { onSquareClick, value } = props;
  return (
    <div
      className="bg-blue-300 flex items-center justify-center h-24 text-4xl font-bold"
      onClick={onSquareClick}
    >
      <span className=" font-bold">{value}</span>
    </div>
  );
};

export default Square;
