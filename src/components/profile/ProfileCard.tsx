"use client";
import React, { useState } from "react";
import Button from "../buttons/Button";
import TextInput from "../inputs/TextInput";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import Title from "../texts/Title";
import { useUserStore } from "@/zustand/store";
import useFormErrors from "@/hooks/useFormErrors";
import { AuthApi } from "@/api/AuthApi";
import { showToastSuccess } from "../toast/ToastAlert";

const ProfileCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, setUser, token } = useUserStore();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [payload, setPayload] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
  });

  const { updateProfile } = AuthApi();
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
      const result = await updateProfile(payload, token);
      if (result.status == 200) {
        setUser(result.data.user);
        showToastSuccess(result.message);
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
    <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
        <Title title="My Profile" />

        <div className="max-w-screen-sm">
          <form onSubmit={handleSubmit}>
            <TextInput
              title="First Name"
              type="text"
              name="first_name"
              onChange={handleChange}
              value={payload.first_name}
              error={formErrors.errors ? handleFormErrors("first_name") : ""}
            />

            <TextInput
              title="Last Name"
              type="text"
              name="last_name"
              onChange={handleChange}
              value={payload.last_name}
              error={formErrors.errors ? handleFormErrors("last_name") : ""}
            />

            <TextInput
              title="Username"
              type="text"
              name="username"
              onChange={handleChange}
              value={payload.username}
              error={formErrors.errors ? handleFormErrors("username") : ""}
            />

            <div className="flex flex-col md:flex-row mt-6 space-y-3 md:space-x-3 md:space-y-0 items-start justify-end ">
              <div className="w-full md:w-48 ">
                <Button
                  isLoading={isButtonLoading}
                  title="Save Changes"
                  style="text-white bg-blue-600 w-full"
                  type="submit"
                />
              </div>
              <div className="w-full md:w-48">
                <Button
                  onClick={() => setIsModalVisible(!isModalVisible)}
                  title="Change Password"
                  style="text-white bg-green-600 w-full"
                  type="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <ChangePasswordModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default ProfileCard;
