"use client";
import React, { useEffect, useState } from "react";
import Player from "@/components/play/Player";
import PlayerHistory from "@/components/play/PlayerHistory";
import Title from "@/components/texts/Title";
import Game from "@/components/play/Game";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/zustand/store";
import { UserProps } from "@/zustand/interfaces";
import InvitedModal from "@/components/modals/InvitedModal";
import {
  showToastError,
  showToastSuccess,
} from "@/components/toast/ToastAlert";
import InviteModal from "@/components/modals/InviteModal";
import WaitModal from "@/components/modals/WaitModal";

const Play = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { user } = useUserStore();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isInvited, setIsInvited] = useState(false);
  const [isInvitationVisible, setIsInvitationVisible] = useState(false);
  const [waitModal, setWaitModal] = useState(false);
  const [rival, setRival] = useState<UserProps>({
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "online",
  });

  const [inviterUser, setInviterUser] = useState<UserProps>({
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "online",
  });
  const [invitedUser, setInvitedUser] = useState<UserProps>({
    uuid: "",
    first_name: "",
    last_name: "",
    username: "",
    status: "online",
  });

  const handleStopGame = () => {
    setIsGameStarted(false);
  };

  const handleInvite = (user: UserProps) => {
    setIsInvitationVisible(true);
    setInvitedUser(user);
  };

  const handleGameInvite = (inviterUser: UserProps) => {
    if (inviterUser) {
      setIsInvited(true);
      setInviterUser(inviterUser);
    }
  };

  const handleGameDecline = (declinerUser: UserProps) => {
    if (declinerUser) {
      showToastError(
        `${
          declinerUser.first_name + " " + declinerUser.last_name
        } declined your invitation`
      );
      setWaitModal(false);
    }
  };

  const handleAcceptInvitation = () => {
    socket.emit("invite:accept", inviterUser, user);
    setIsGameStarted(true);
    setIsInvited(false);
    setRival(inviterUser);
  };

  const handleStartGame = (invitedUser: UserProps) => {
    showToastSuccess(
      `${
        invitedUser.first_name + " " + invitedUser.last_name
      } accepted your invitation`
    );
    setIsGameStarted(true);
    setWaitModal(false);
    setRival(invitedUser);
  };

  useEffect(() => {
    if (user.uuid !== "") {
      socket.emit("set-user", user);
      socket.on("get-users", (users) => {
        console.log("users ", users);
        const filteredUsers = users.filter(
          (u: any) => u.user.uuid !== user.uuid
        );
        setOnlineUsers(filteredUsers);
      });
    }
  }, [user]);

  useEffect(() => {
    socket.on("game:invitation", handleGameInvite);
    socket.on("game:decline", handleGameDecline);
    socket.on("game:start", handleStartGame);

    return () => {
      socket.off("game:invitation", handleGameInvite);
      socket.off("game:decline", handleGameDecline);
      socket.on("game:start", handleStartGame);
    };
  }, []);

  return (
    <>
      {!isGameStarted ? (
        <>
          <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
              {/* initial view */}
              <div>
                <Title title="Online Players" />

                {onlineUsers.length === 0 ? (
                  <p>There's no online players right now</p>
                ) : (
                  <>
                    {onlineUsers.map((item: any, index: number) => (
                      <Player
                        key={index}
                        data={item.user}
                        handleInvite={() => handleInvite(item.user)}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* game view  */}
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:mx-auto mx-4">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
              <Title
                title={`Youre playing against ${
                  rival.first_name + " " + rival.last_name
                }`}
              />

              <div className="flex flex-col lg:flex-row justify-between lg:space-x-4 space-y-4 lg:space-y-0">
                <Game stopGame={handleStopGame} />
                <PlayerHistory />
              </div>
            </div>
          </div>
        </>
      )}

      <InviteModal
        userName={invitedUser.first_name + " " + invitedUser.last_name}
        user={invitedUser}
        visible={isInvitationVisible}
        onAccept={() => setWaitModal(true)}
        onClose={() => setIsInvitationVisible(false)}
      />

      <InvitedModal
        visible={isInvited}
        onClose={() => setIsInvited(false)}
        inviterUser={inviterUser}
        onAccept={handleAcceptInvitation}
      />

      <WaitModal
        userName={invitedUser.first_name + " " + invitedUser.last_name}
        visible={waitModal}
        onClose={() => setWaitModal(false)}
      />
    </>
  );
};

export default Play;
