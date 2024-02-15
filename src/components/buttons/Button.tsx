import React from "react";
import { ButtonProps } from "./interfaces";

const Button = (props: ButtonProps) => {
  const { type, onClick, title, style } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${style} font-medium rounded-md text-sm px-5 py-2.5`}
    >
      {title}
    </button>
  );
};

export default Button;
