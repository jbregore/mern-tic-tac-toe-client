"use client";
import { GameApi } from "@/api/GameApi";
import HistoryItem from "@/components/history/HistoryItem";
import Navbar from "@/components/navbar/Navbar";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import Title from "@/components/texts/Title";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/zustand/store";
import usePaginate from "@/hooks/usePaginate";
import { useSearchParams } from "next/navigation";

const History = () => {
  const searchParams = useSearchParams();
  const { getGames } = GameApi();
  const { user, token } = useUserStore();

  const {
    data: gameLists,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`my-history-${user.uuid}`],
    queryFn: () => getGames(token, searchParams),
  });

  const { page, handlePaginationChange } = usePaginate(`/history`);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  console.log("gameLists ", gameLists);

  return (
    <>
      <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
          <Title title="My Game History" />

          {gameLists?.data?.length === 0 && (
            <p>You have no game history right now</p>
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
    </>
  );
};

export default History;
