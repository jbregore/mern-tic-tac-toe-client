"use client";
import React, { useState } from "react";
import InviteModal from "../modals/InviteModal";
import Button from "../buttons/Button";

const Player = (props: any) => {
  const { startGame } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="flex items-center mb-4 shadow-md p-3 rounded-md cursor-pointer">
        <div className="grow flex items-center space-x-2">
          <div className="bg-green-600 w-4 h-4 rounded-full"></div>
          <div>
            <p>Kosang Tibor</p>
            <p className="text-sm text-gray-600">Rank #1</p>
          </div>
        </div>

        {/* <div className="flex-none mr-4">
          <p className={`font-bold text-green-700`}>ONLINE</p>
        </div> */}

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
        startGame={startGame}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default Player;
