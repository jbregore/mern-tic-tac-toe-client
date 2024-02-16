import HistoryItem from "@/components/history/HistoryItem";
import Navbar from "@/components/navbar/Navbar";
import Title from "@/components/texts/Title";
import React from "react";

const History = () => {
  return (
    <main className="min-h-screen pt-32">
      <Navbar activeLink="history" />

      <div className="max-w-screen-sm flex flex-wrap items-center justify-between md:mx-auto mx-4">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
          <Title title="My Game History" />

          <HistoryItem user="Kosang Lando" date="02/15/2024" result="won" />
          <HistoryItem user="Kosang Lando" date="02/15/2024" result="lost" />
          <HistoryItem user="Kosang Lando" date="02/15/2024" result="tied" />
        </div>
      </div>
    </main>
  );
};

export default History;
