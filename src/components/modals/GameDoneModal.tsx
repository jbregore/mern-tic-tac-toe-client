import React, { useState } from "react";
import Modal from "./Modal";
import Title from "../texts/Title";
import Button from "../buttons/Button";
import { socket } from "@/utils/socket";
import WaitRematchModal from "./WaitRematchModal";

const GameDoneModal = (props: any) => {
  const {
    visible,
    onClose,
    message,
    user,
    opponent,
    waitRematchInvitation,
    setWaitRematchInvitation,
  } = props;
  return (
    <Modal visible={visible}>
      <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
        <Title title={message} />

        <div className="flex mt-6 space-x-2 md:space-y-0 items-center justify-center py-4">
          <p>Do you want to play again ?</p>
        </div>

        <div className="flex mt-6 space-x-2 md:space-y-0 items-start justify-center ">
          <div className="w-full md:w-32 ">
            <Button
              onClick={() => {
                socket.emit("continue:agreed", user, opponent, true);
                setWaitRematchInvitation(true);
                // onClose(false);
              }}
              title="Yes"
              style="text-white bg-blue-600 w-full"
              type="button"
            />
          </div>
          <div className="w-full md:w-32">
            <Button
              onClick={() => {
                socket.emit("continue:agreed", user, opponent, false);
                onClose(false);
              }}
              title="No"
              style="text-white bg-red-600 w-full"
              type="button"
            />
          </div>
        </div>
      </div>

      <WaitRematchModal
        invitedUser={opponent}
        visible={waitRematchInvitation}
        onClose={() => {
          socket.emit("continue:agreed", user, opponent, false);
          setWaitRematchInvitation(false);
          onClose(false);
        }}
      />
    </Modal>
  );
};

export default GameDoneModal;
