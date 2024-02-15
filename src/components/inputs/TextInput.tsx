import React from "react";
import { TextInputProps } from "./interfaces";

const TextInput = (props: TextInputProps) => {
  const { title, type, isDisabled, onChange, name, value } = props;

  return (
    <div className="mb-4">
      <label
        htmlFor={title}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        type={type}
        id={title}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none block w-full p-2.5"
        placeholder={title}
        disabled={isDisabled}
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
};

export default TextInput;
