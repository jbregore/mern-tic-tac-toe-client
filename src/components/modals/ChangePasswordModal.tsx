import React, { useState } from "react";
import Modal from "./Modal";
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import { ChangePasswordModalProps } from "./interfaces";
import useFormErrors from "@/hooks/useFormErrors";
import { useUserStore } from "@/zustand/store";
import { showToastSuccess } from "../toast/ToastAlert";
import { AuthApi } from "@/api/AuthApi";

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { visible, onClose } = props;
  const { token } = useUserStore();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [payload, setPayload] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { updatePassword } = AuthApi();
  const {
    formErrors,
    setFormErrors,
    handleFormErrors,
    errorHandler,
    mainError,
    setMainError,
  } = useFormErrors();

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonLoading(true);
    try {
      const result = await updatePassword(payload, token);
      if (result.status == 200) {
        showToastSuccess(result.message);
        setPayload({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
        onClose(false);
      }
    } catch (err: any) {
      if (err.response.status === 422) {
        const errors = errorHandler(err);
        setFormErrors(errors);
        setMainError("");
      }
      if (err.response.status === 404) {
        const error404 = errorHandler(err);
        setFormErrors([]);
        setMainError(error404);
      }
    }
    setIsButtonLoading(false);
  };

  return (
    <Modal visible={visible}>
      <div className="relative bg-white w-[500px] max-h-[80%] overflow-auto rounded-lg shadow dark:bg-gray-700 p-4">
        <p className="mb-2 border-b border-b-gray-300 pb-2 text-lg font-semibold">
          Change Password
        </p>

        <form onSubmit={handleSubmit}>
          <TextInput
            title="Old Password"
            type="password"
            name="old_password"
            onChange={handleChange}
            value={payload.old_password}
            error={formErrors.errors ? handleFormErrors("old_password") : ""}
          />
          <TextInput
            title="New Password"
            type="password"
            name="new_password"
            onChange={handleChange}
            value={payload.new_password}
            error={formErrors.errors ? handleFormErrors("new_password") : ""}
          />
          <TextInput
            title="Confirm Password"
            type="password"
            name="confirm_password"
            onChange={handleChange}
            value={payload.confirm_password}
            error={
              formErrors.errors ? handleFormErrors("confirm_password") : ""
            }
          />

          <div className="flex mt-6 space-x-2 md:space-y-0 items-start justify-end ">
            <div className=" md:w-44 ">
              <Button
                isLoading={isButtonLoading}
                title="Save Changes"
                style="text-white bg-blue-600 w-full"
                type="submit"
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
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
