import { UserProps } from "@/zustand/interfaces";

export interface GameProps {
  boardTitle: string;
  setBoardTitle: React.Dispatch<React.SetStateAction<string>>;
  user: UserProps;
  opponent: UserProps;
  isMyTurn: boolean;
  setIsMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
}

export interface BoardProps extends GameProps {}

export interface SquareProps {
  onSquareClick: any;
  value: string;
}
