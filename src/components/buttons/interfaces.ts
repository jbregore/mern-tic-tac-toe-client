export interface ButtonProps {
  type: "button" | "submit" | "reset";
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: string;
  isLoading?: boolean;
}
