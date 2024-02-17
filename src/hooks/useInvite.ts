import { UserProps } from "@/zustand/interfaces";
import React, { useState } from "react";

const useInvite = () => {
  const [waitModal, setWaitModal] = useState(false);
  const [isInvitationVisible, setIsInvitationVisible] = useState(false);
  const [invitedUser, setInvitedUser] = useState<UserProps>({
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "online",
  });
  const [inviterUser, setInviterUser] = useState<UserProps>({
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "online",
  });

  const handleInvite = (user: UserProps) => {
    setIsInvitationVisible(true);
    setInvitedUser(user);
  };

  return {
    isInvitationVisible,
    setIsInvitationVisible,
    invitedUser,
    setInvitedUser,
    handleInvite,
    waitModal,
    setWaitModal,
    inviterUser,
    setInviterUser,
  };
};

export default useInvite;
