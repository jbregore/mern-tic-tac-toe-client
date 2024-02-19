"use client";
import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";

const Player = (props: any) => {
  const { data, handleInvite } = props;

  return (
    <>
      <div className="flex items-center mb-4 shadow-md p-3 rounded-md cursor-pointer">
        <div className="grow flex items-center space-x-2">
          <div className="bg-green-600 w-4 h-4 rounded-full"></div>
          <div>
            <p>{data.first_name + " " + data.last_name}</p>
          </div>
        </div>

        <div>
          <Button
            onClick={handleInvite}
            title="Invite"
            style="text-white bg-blue-600 w-full"
            type="button"
          />
        </div>
      </div>
    </>
  );
};

export default Player;
