import React from "react";

const Modal = ({
  children,
  visible,
}: Readonly<{
  children: React.ReactNode;
  visible: boolean;
}>) => {
  return (
    <div
      id="default-modal"
      className={`${
        !visible && "hidden"
      } fixed top-0 left-0 z-50 bg-[#00000096] h-screen md:h-full w-full items-center`}
    >
      <div className="relative p-4 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Modal;
