"use client";
import { RankApi } from "@/api/RankApi";
import Navbar from "@/components/navbar/Navbar";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import RankingItem from "@/components/rankings/RankingItem";
import Title from "@/components/texts/Title";
import usePaginate from "@/hooks/usePaginate";
import { useUserStore } from "@/zustand/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Rankings = () => {
  const searchParams = useSearchParams();
  const { getRanks } = RankApi();
  const { user, token } = useUserStore();

  const {
    data: rankLists,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`rankings-${user.uuid}`],
    queryFn: () => getRanks(token, searchParams),
  });

  const { page, handlePaginationChange } = usePaginate(`/rankings`);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  console.log("rankLists ", rankLists);

  return (
    <>
      <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
          <Title title="Rankings" />

          {rankLists?.data?.length === 0 && (
            <p>There&apos;s no rank list right now</p>
          )}
          {rankLists?.data.map((item: any, index: any) => (
            <RankingItem
              rank={index + 1}
              user={item.name}
              score={item.wins}
              key={index}
            />
          ))}
        </div>
      </div>

      {!isLoading && (
        <div className="max-w-screen-sm md:mx-auto mx-4">
          <PaginationComponent
            page={page}
            numberOfPages={rankLists?.meta?.lastPage}
            data={rankLists?.data || []}
            total={rankLists?.meta?.totalRecords}
            onNext={handlePaginationChange}
          />
        </div>
      )}
    </>
  );
};

export default Rankings;
