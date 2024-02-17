import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../buttons/Button";
import { InviteModalProps } from "./interfaces";
import Title from "../texts/Title";
import WaitModal from "./WaitModal";

const InviteModal = (props: InviteModalProps) => {
  const { visible, onClose, startGame, userName } = props;

  const [waitModal, setWaitModal] = useState(false);

  return (
    <>
      <Modal visible={visible}>
        <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
          <Title title={`Invite ${userName} to a new game?`} />

          <div className="flex mt-6 space-x-2 md:space-y-0 items-start justify-end ">
            <div className=" md:w-32 ">
              <Button
                onClick={() => {
                  setWaitModal(true);
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

      <WaitModal
        userName={userName}
        visible={waitModal}
        onClose={() => setWaitModal(false)}
      />
    </>
  );
};

export default InviteModal;
