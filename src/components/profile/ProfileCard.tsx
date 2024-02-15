"use client";
import React, { useState } from "react";
import Button from "../buttons/Button";
import TextInput from "../inputs/TextInput";
import ChangePasswordModal from "../modals/ChangePasswordModal";

const ProfileCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
        <p className="mb-6 border-b border-b-gray-300 pb-2 text-lg font-semibold">
          My Profile
        </p>

        <div className="max-w-screen-sm">
          <form>
            <TextInput title="First Name" type="text" />

            <TextInput title="Last Name" type="text" />

            <TextInput title="Username" type="text" />

            <div className="flex flex-col md:flex-row mt-6 space-y-3 md:space-x-3 md:space-y-0 items-start justify-end ">
              <div className="w-full md:w-48 ">
                <Button
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
