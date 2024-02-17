"use client";
import React, { useState } from "react";
import InviteModal from "../modals/InviteModal";
import Button from "../buttons/Button";
import InvitedModal from "../modals/InvitedModal";

const Player = (props: any) => {
  const { startGame, data } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInvited, setIsInvited] = useState(false);

  return (
    <>
      <div className="flex items-center mb-4 shadow-md p-3 rounded-md cursor-pointer">
        <div className="grow flex items-center space-x-2">
          <div className="bg-green-600 w-4 h-4 rounded-full"></div>
          <div>
            <p>{data.first_name + " " + data.last_name}</p>
            <p className="text-sm text-gray-600">Rank #1</p>
          </div>
        </div>

        <div>
          <Button
            onClick={() => setIsModalVisible(!isModalVisible)}
            title="Invite"
            style="text-white bg-blue-600 w-full"
            type="button"
          />
        </div>
      </div>
      <InviteModal
        userName={data.first_name + " " + data.last_name}
        startGame={startGame}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <InvitedModal visible={isInvited} onClose={() => setIsInvited(false)} />
    </>
  );
};

export default Player;
