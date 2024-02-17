export interface DefaultModalProps {
  visible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChangePasswordModalProps extends DefaultModalProps {}

export interface InviteModalProps extends DefaultModalProps {
  startGame: () => void;
  userName: string;
}

export interface WaitModalProps extends DefaultModalProps {
  userName: string;
}
