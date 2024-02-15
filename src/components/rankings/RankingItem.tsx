import React from "react";
import { RankingItemProps } from "./interfaces";

const RankingItem = (props: RankingItemProps) => {
  const { rank, user, score } = props;
  return (
    <div className="flex items-center mb-4">
      <div className="grow flex items-center space-x-2">
        <div>
          <span className="font-bold">#{rank}</span>
        </div>
        <div>
          <p>{user}</p>
        </div>
      </div>

      <div className="flex-none">
        <p className={`font-bold text-yellow-500`}>{score}</p>
      </div>
    </div>
  );
};

export default RankingItem;
