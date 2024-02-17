import { UserProps } from "@/zustand/interfaces";

export interface DefaultModalProps {
  visible: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChangePasswordModalProps extends DefaultModalProps {}

export interface InviteModalProps extends DefaultModalProps {
  invitedUser: UserProps;
  onAccept: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WaitModalProps extends DefaultModalProps {
  invitedUser: UserProps;
}

export interface InvitedModalProps extends DefaultModalProps {
  inviterUser: UserProps;
  onAccept: any;
}
