"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Player from "@/components/play/Player";
import PlayerHistory from "@/components/play/PlayerHistory";
import Title from "@/components/texts/Title";
import Game from "@/components/play/Game";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/zustand/store";

const Play = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { user } = useUserStore();

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleStopGame = () => {
    setIsGameStarted(false);
  };

  useEffect(() => {
    socket.connect();
  }, [socket, user]);

  return (
    <>
      {!isGameStarted ? (
        <>
          <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
              {/* initial view */}
              <div>
                <Title title="Online Players" />

                {/* <p>There's no online players right now</p> */}
                {[0, 1, 2].map((item: any, index: number) => (
                  <Player key={index} startGame={handleStartGame} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* game view  */}
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:mx-auto mx-4">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
              <Title title="Youre playing against Kosang Tibor" />

              <div className="flex flex-col lg:flex-row justify-between lg:space-x-4 space-y-4 lg:space-y-0">
                <Game stopGame={handleStopGame} />
                <PlayerHistory />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Play;
