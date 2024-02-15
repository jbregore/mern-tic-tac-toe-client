import React from "react";
import Modal from "./Modal";
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import { ChangePasswordModalProps } from "./interfaces";

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { visible, onClose } = props;
  return (
    <Modal visible={visible}>
      <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
        <p className="mb-2 border-b border-b-gray-300 pb-2 text-lg font-semibold">
          Change Password
        </p>

        <form>
          <TextInput title="Old Password" type="password" />
          <TextInput title="New Password" type="password" />
          <TextInput title="Confirm Password" type="password" />

          <div className="flex mt-6 space-x-2 md:space-y-0 items-start justify-end ">
            <div className=" md:w-44 ">
              <Button
                title="Save Changes"
                style="text-white bg-blue-600 w-full"
                type="submit"
              />
            </div>
            <div className="md:w-32">
              <Button
                onClick={onClose}
                title="Close"
                style="text-white bg-red-600 w-full"
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
