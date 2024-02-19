import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Title from "../texts/Title";
import Button from "../buttons/Button";
import { InvitedModalProps } from "./interfaces";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/zustand/store";

const InvitedModal = (props: InvitedModalProps) => {
  const { visible, onClose, inviterUser, onAccept } = props;
  const { user } = useUserStore();
  const [counter, setCounter] = useState(20);

  const inviterUserFullName =
    inviterUser.first_name + " " + inviterUser.last_name;

  useEffect(() => {
    let timeoutId: any = null;

    if (visible) {
      timeoutId = setTimeout(() => {
        setCounter(20);
        onClose(false);
        socket.emit("invite:decline", user, inviterUser.uuid);
      }, 20000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [visible]);

  return (
    <Modal visible={visible}>
      <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
        <Title title={`${inviterUserFullName} invited you to a new game`} />
        <p className="text-center mb-2">
          Game will be auto declined after {counter} seconds.
        </p>

        <div className="flex mt-6 space-x-2 md:space-y-0 items-start justify-end ">
          <div className=" md:w-32 ">
            <Button
              onClick={onAccept}
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
