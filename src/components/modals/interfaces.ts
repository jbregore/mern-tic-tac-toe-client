import { UserProps } from "@/zustand/interfaces";

export interface DefaultModalProps {
  visible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChangePasswordModalProps extends DefaultModalProps {}

export interface InviteModalProps extends DefaultModalProps {
  user: UserProps;
  userName: string;
  onAccept: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WaitModalProps extends DefaultModalProps {
  userName: string;
}

export interface InvitedModalProps extends DefaultModalProps {
  inviterUser: UserProps;
}
