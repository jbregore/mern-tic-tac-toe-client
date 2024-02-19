import React from "react";
import Link from "next/link";
import { NavbarLinkProps } from "./interfaces";
import { socket } from "@/utils/socket";

const NavbarLink = (props: NavbarLinkProps) => {
  const { title, link, isActive } = props;
  return (
    <li
      className={`
    ${
      isActive ? "text-blue-600 " : "text-gray-900 "
    } block py-2 px-3  rounded md:bg-transparent md:p-0
    `}
      onClick={() => {
        socket.emit("logout");
      }}
    >
      <Link href={link}>{title}</Link>
    </li>
  );
};

export default NavbarLink;
