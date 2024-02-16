import React from "react";
import { ButtonProps } from "./interfaces";
import Spinner from "./Spinner";

const Button = (props: ButtonProps) => {
  const { type, onClick, title, style, isLoading = false } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${style} font-medium rounded-md text-sm px-5 py-2.5`}
    >
      <div className="flex justify-center items-center">
        {isLoading ? <Spinner style="w-6 h-6 ml-2" /> : <>{title} </>}
      </div>
    </button>
  );
};

export default Button;
