import { ChangeEventHandler } from "react";

export interface TextInputProps {
  title: string;
  type: string;
  isDisabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  value?: string;
  error?: string;
}
