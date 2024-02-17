import React from "react";
import Modal from "./Modal";
import Title from "../texts/Title";
import Button from "../buttons/Button";
import { InvitedModalProps } from "./interfaces";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/zustand/store";

const InvitedModal = (props: InvitedModalProps) => {
  const { visible, onClose, inviterUser } = props;
  const { user } = useUserStore();

  return (
    <Modal visible={visible}>
      <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
        <Title
          title={`${
            inviterUser.first_name + " " + inviterUser.last_name
          } invited you to a new game`}
        />

        <div className="flex mt-6 space-x-2 md:space-y-0 items-start justify-end ">
          <div className=" md:w-32 ">
            <Button
              title="Accept"
              style="text-white bg-blue-600 w-full"
              type="button"
            />
          </div>
          <div className="md:w-32">
            <Button
              onClick={() => {
                socket.emit("invite:decline", user, inviterUser.uuid);
                onClose(false);
              }}
              title="Decline"
              style="text-white bg-red-600 w-full"
              type="button"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InvitedModal;
