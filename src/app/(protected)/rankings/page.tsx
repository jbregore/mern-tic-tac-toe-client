import Navbar from "@/components/navbar/Navbar";
import RankingItem from "@/components/rankings/RankingItem";
import Title from "@/components/texts/Title";
import React from "react";

const Rankings = () => {
  return (
    <>
      <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
          <Title title="Rankings" />

          <RankingItem rank="1" user="Talamismis" score={100} />
          <RankingItem rank="2" user="Abadingdong" score={90} />
          <RankingItem rank="3" user="Balweg" score={80} />
        </div>
      </div>
    </>
  );
};

export default Rankings;
