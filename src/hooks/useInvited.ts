import React, { useState } from "react";

const useInvited = () => {
  const [isInvited, setIsInvited] = useState(false);

  return {
    isInvited,
    setIsInvited,
  };
};

export default useInvited;
