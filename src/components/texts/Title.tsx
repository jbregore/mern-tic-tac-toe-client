import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <p className="mb-4 border-b border-b-gray-300 pb-2 text-lg font-semibold">
      {title}
    </p>
  );
};

export default Title;
