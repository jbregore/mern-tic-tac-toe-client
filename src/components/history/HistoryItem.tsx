import React from "react";
import { HistoryItemProps } from "./interfaces";

const HistoryItem = (props: HistoryItemProps) => {
  const { user, date, result, userInitials } = props;
  return (
    <div className="flex items-center mb-4">
      <div className="grow flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center font-bold">
          {userInitials}
        </div>
        <div>
          <p>{user}</p>
          <p className="text-gray-600 text-sm">{date}</p>
        </div>
      </div>

      <div className="flex-none">
        <p
          className={`font-bold ${
            result === "won"
              ? "text-green-700"
              : result === "lost"
              ? "text-red-700"
              : result === "tied"
              ? "text-yellow-700"
              : ""
          }`}
        >
          {result === "tied"
            ? result.toUpperCase()
            : `YOU ${result.toUpperCase()}`}
        </p>
      </div>
    </div>
  );
};

export default HistoryItem;
