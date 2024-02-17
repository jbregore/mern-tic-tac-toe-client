import { UserProps } from "@/zustand/interfaces";

export interface GameProps {
  stopGame: () => void;
  boardTitle: string;
  user: UserProps;
  inviterUser: UserProps;
  isMyTurn: boolean;
  setIsMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
}

export interface SquareProps {
  onSquareClick: any;
  value: string;
}
