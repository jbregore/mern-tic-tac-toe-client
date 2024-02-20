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
import useInvite from "@/hooks/useInvite";
import useInvited from "@/hooks/useInvited";
import useGame from "@/hooks/useGame";
import GameDoneModal from "@/components/modals/GameDoneModal";
import { useRouter } from "next/navigation";

const Play = () => {
  const { user } = useUserStore();
  const router = useRouter();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [firstMover, setFirstMover] = useState<any>(null);

  const [waitRematchInvitation, setWaitRematchInvitation] = useState(false);

  //invite
  const {
    isInvitationVisible,
    setIsInvitationVisible,
    invitedUser,
    handleInvite,
    waitModal,
    setWaitModal,
    inviterUser,
    setInviterUser,
  } = useInvite();

  //invited
  const { isInvited, setIsInvited } = useInvited();

  //game
  const {
    isGameStarted,
    setIsGameStarted,
    opponent,
    setOpponent,
    boardTitle,
    setBoardTitle,
    isMyTurn,
    setIsMyTurn,
    turn,
    setTurn,
    gameMessage,
    setGameMessage,
    isGameDoneModalVisible,
    setIsGameDoneModalVisible,
  } = useGame();

  const handleStopGame = () => {
    setIsGameStarted(false);
  };

  const handleGameInvite = (inviterUser: UserProps) => {
    if (inviterUser) {
      setIsInvited(true);
      setInviterUser(inviterUser);
      setFirstMover(inviterUser);
    }
  };

  const handleCancelInvite = () => {
    setIsInvited(false);
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
    setFirstMover(inviterUser);
    setIsGameStarted(true);
    setIsInvited(false);
    setOpponent(inviterUser);
    setBoardTitle("Opponents turn (X)");
    setIsMyTurn(false);
    setTurn("O");
  };

  const handleStartGame = (invitedUser: UserProps) => {
    showToastSuccess(
      `${
        invitedUser.first_name + " " + invitedUser.last_name
      } accepted your invitation`
    );
    setIsGameStarted(true);
    setWaitModal(false);
    setOpponent(invitedUser);
    setBoardTitle("Your turn (X)");
    setIsMyTurn(true);
    setTurn("X");
  };

  const handleGameUpdated = (
    turn: any,
    opponent: any,
    me: any,
    boardData: any
  ) => {
    setIsMyTurn(true);
    setTurn(turn);
    setOpponent(opponent);
    setBoardTitle(`My turn (${turn})`);
  };

  const handleGameDone = (message: string, isWinner: boolean) => {
    setIsGameDoneModalVisible(true);
    setGameMessage(message);
  };

  const handleRematch = () => {
    showToastSuccess(`Rematch !`);
    setIsGameDoneModalVisible(false);
    setWaitRematchInvitation(false);
  };

  const handleDeclineRematch = (decliner: UserProps | null) => {
    if (decliner) {
      showToastError(
        `${decliner.first_name + " " + decliner.last_name} don't want a rematch`
      );
    }
    setIsGameDoneModalVisible(false);
    setIsGameStarted(false);
    setWaitRematchInvitation(false);
  };

  useEffect(() => {
    if (user.uuid !== "") {
      socket.emit("set-user", user);
      socket.on("get-users", (users) => {
        const filteredUsers = users.filter(
          (u: any) => u.user.uuid !== user.uuid
        );
        setOnlineUsers(filteredUsers);
      });
    }
  }, [user, router]);

  useEffect(() => {
    console.log("trigerredddd");
    socket.on("game:invitation", handleGameInvite);
    socket.on("game:decline", handleGameDecline);
    socket.on("game:start", handleStartGame);
    socket.on("game:close", handleCancelInvite);
    socket.on("gameplay:updated", handleGameUpdated);
    socket.on("gameplay:done", handleGameDone);
    socket.on("start:new_match", handleRematch);
    socket.on("cancel:new_match", handleDeclineRematch);

    return () => {
      socket.off("game:invitation", handleGameInvite);
      socket.off("game:decline", handleGameDecline);
      socket.off("game:start", handleStartGame);
      socket.off("game:close", handleCancelInvite);
      socket.off("gameplay:updated", handleGameUpdated);
      socket.off("gameplay:done", handleGameDone);
      socket.off("start:new_match", handleRematch);
      socket.off("cancel:new_match", handleDeclineRematch);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <p>There&apos;s no online players right now</p>
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
                  opponent.first_name + " " + opponent.last_name
                }`}
              />

              <div className="flex flex-col lg:flex-row justify-between lg:space-x-4 space-y-4 lg:space-y-0">
                <Game
                  boardTitle={boardTitle}
                  setBoardTitle={setBoardTitle}
                  opponent={opponent}
                  user={user}
                  isMyTurn={isMyTurn}
                  setIsMyTurn={setIsMyTurn}
                  turn={turn}
                  setTurn={setTurn}
                />
                <PlayerHistory opponent={opponent} />
              </div>
            </div>
          </div>
        </>
      )}

      <InviteModal
        invitedUser={invitedUser}
        visible={isInvitationVisible}
        onAccept={() => setWaitModal(true)}
        onClose={() => setIsInvitationVisible(false)}
        setFirstMover={setFirstMover}
      />

      <InvitedModal
        visible={isInvited}
        onClose={() => setIsInvited(false)}
        inviterUser={inviterUser}
        onAccept={handleAcceptInvitation}
      />

      <WaitModal
        invitedUser={invitedUser}
        visible={waitModal}
        onClose={() => {
          socket.emit("invite:cancel", invitedUser);
          setWaitModal(false);
        }}
      />

      <GameDoneModal
        user={user}
        opponent={opponent}
        visible={isGameDoneModalVisible}
        onClose={() => {
          setIsGameDoneModalVisible(false);
        }}
        message={gameMessage}
        waitRematchInvitation={waitRematchInvitation}
        setWaitRematchInvitation={setWaitRematchInvitation}
      />
    </>
  );
};

export default Play;
