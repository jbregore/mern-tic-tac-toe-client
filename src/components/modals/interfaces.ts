export interface DefaultModalProps {
  visible: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ChangePasswordModalProps extends DefaultModalProps {}

export interface InviteModalProps extends DefaultModalProps {
  startGame: () => void;
}
