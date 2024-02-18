import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../buttons/Button";
import { InviteModalProps } from "./interfaces";
import Title from "../texts/Title";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/zustand/store";

const InviteModal = (props: any) => {
  const { invitedUser, visible, onClose, onAccept, setFirstMover } = props;

  const { user: inviter } = useUserStore();

  const invitedUserFullName =
    invitedUser?.first_name + " " + invitedUser?.last_name;

  return (
    <>
      <Modal visible={visible}>
        <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
          <Title title={`Invite ${invitedUserFullName} to a new game?`} />

          <div className="flex mt-6 space-x-2 md:space-y-0 items-start justify-end ">
            <div className=" md:w-32 ">
              <Button
                onClick={() => {
                  socket.emit("invite:user", inviter, invitedUser.uuid);
                  setFirstMover(inviter);
                  onAccept(true);
                  onClose(false);
                }}
                title="Yes"
                style="text-white bg-blue-600 w-full"
                type="button"
              />
            </div>
            <div className="md:w-32">
              <Button
                onClick={() => onClose(false)}
                title="Close"
                style="text-white bg-red-600 w-full"
                type="button"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InviteModal;
