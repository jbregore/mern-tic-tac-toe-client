import React from "react";
import HistoryItem from "../history/HistoryItem";
import Title from "../texts/Title";

const PlayerHistory = () => {
  return (
    <div className="w-full ">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 ">
        <Title title="Our Game History" />
        <HistoryItem user="Kosang Tibor" date="02/15/2024" result="won" />
        <HistoryItem user="Kosang Tibor" date="02/15/2024" result="lost" />
        <HistoryItem user="Kosang Tibor" date="02/15/2024" result="tied" />
      </div>
    </div>
  );
};

export default PlayerHistory;
