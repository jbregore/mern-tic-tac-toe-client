import React, { useEffect } from "react";
import HistoryItem from "../history/HistoryItem";
import Title from "../texts/Title";
import { GameApi } from "@/api/GameApi";
import { useUserStore } from "@/zustand/store";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import usePaginate from "@/hooks/usePaginate";
import PaginationComponent from "../pagination/PaginationComponent";
import { socket } from "@/utils/socket";

const PlayerHistory = (props: any) => {
  const { opponent } = props;

  const searchParams = useSearchParams();
  const { getGamesWith } = GameApi();
  const { user, token } = useUserStore();

  const {
    data: gameLists,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`my-history-${user.uuid}`],
    queryFn: () => getGamesWith(token, opponent._id, searchParams),
  });

  const { page, handlePaginationChange } = usePaginate(`/play`);

  const handleGameDone = (message: string, isWinner: boolean) => {
    refetch();
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    socket.on("gameplay:done", handleGameDone);

    return () => {
      socket.on("gameplay:done", handleGameDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full ">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
          <Title title="Our Game History" />

          {gameLists?.data?.length === 0 && (
            <p>You have no game history with this player</p>
          )}

          {gameLists?.data.map((item: any, index: any) => (
            <HistoryItem
              userInitials={
                item.opponent.first_name.charAt(0).toUpperCase() +
                item.opponent.last_name.charAt(0).toUpperCase()
              }
              key={index}
              user={item.opponent.first_name + " " + item.opponent.last_name}
              date={item.createdAt}
              result={item.result}
            />
          ))}
        </div>
        {!isLoading && (
          <div className="max-w-screen-sm md:mx-auto mx-4">
            <PaginationComponent
              page={page}
              numberOfPages={gameLists?.meta?.lastPage}
              data={gameLists?.data || []}
              total={gameLists?.meta?.totalRecords}
              onNext={handlePaginationChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerHistory;
