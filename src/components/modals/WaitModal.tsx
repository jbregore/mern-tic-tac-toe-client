import React from "react";
import Modal from "./Modal";
import Title from "../texts/Title";
import Spinner from "../buttons/Spinner";
import { WaitModalProps } from "./interfaces";
import Button from "../buttons/Button";

const WaitModal = (props: WaitModalProps) => {
  const { visible, onClose, invitedUser } = props;

  const invitedUserFullName =
    invitedUser.first_name + " " + invitedUser.last_name;

  return (
    <Modal visible={visible}>
      <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
        <Title title={`Waiting for ${invitedUserFullName} response`} />

        <div className="flex mt-6 space-x-2 md:space-y-0 items-center justify-center py-6">
          <Spinner style="w-12 h-12 ml-2" />
        </div>

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
