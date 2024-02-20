import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Title from "../texts/Title";
import Spinner from "../buttons/Spinner";
import { WaitModalProps } from "./interfaces";
import Button from "../buttons/Button";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/zustand/store";
import { UserProps } from "@/zustand/interfaces";

const WaitModal = (props: WaitModalProps) => {
  const { visible, onClose, invitedUser } = props;
  const { user } = useUserStore();
  const [counter, setCounter] = useState(20);

  const invitedUserFullName =
    invitedUser.first_name + " " + invitedUser.last_name;

  const handleGameDecline = (declinerUser: UserProps) => {
    setCounter(20);
  };

  useEffect(() => {
    let timeoutId: any = null;

    if (visible) {
      timeoutId = setTimeout(() => {
        onClose(false);
        setCounter(20);
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

  useEffect(() => {
    socket.on("game:decline", handleGameDecline);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal visible={visible}>
      <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
        <Title title={`Waiting for ${invitedUserFullName} response`} />

        <div className="flex mt-6 space-x-2 md:space-y-0 items-center justify-center py-6">
          <Spinner style="w-12 h-12 ml-2" />
        </div>

        <p className="text-center mb-2">
          Game will be auto declined after {counter} seconds.
        </p>

        <div className="md:w-32 mx-auto">
          <Button
            onClick={() => onClose(false)}
            title="Cancel"
            style="text-white bg-red-600 w-full"
            type="button"
          />
        </div>
      </div>
    </Modal>
  );
};

export default WaitModal;
