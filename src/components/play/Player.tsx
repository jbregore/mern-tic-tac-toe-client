"use client";
import React, { useState } from "react";
import InviteModal from "../modals/InviteModal";

const Player = (props: any) => {
  const { startGame } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div
        className="flex items-center mb-4 shadow-md p-3 rounded-md cursor-pointer"
        onClick={() => setIsModalVisible(!isModalVisible)}
      >
        <div className="grow flex items-center space-x-2">
          <div>
            <p>Kosang Tibor</p>
          </div>
        </div>

        <div className="flex-none">
          <p className={`font-bold text-green-700`}>ONLINE</p>
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
