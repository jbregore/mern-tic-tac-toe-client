"use client";
import { Banner } from "@/images";
import Image from "next/image";
import React, { useState } from "react";
import NavbarLink from "./NavbarLink";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { NavbarProps } from "./interfaces";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/zustand/store";
import { AuthApi } from "@/api/AuthApi";
import { socket } from "@/utils/socket";

const Navbar = (props: NavbarProps) => {
  const router = useRouter();
  const { user, setUser, token } = useUserStore();

  const { signout } = AuthApi();

  const { activeLink } = props;
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false);

  const handleLogout = async () => {
    Cookies.remove("token");
    await signout(token);
    socket.emit("logout");
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <Image
            src={Banner}
            alt="Tic Tac Toe Banner"
            className="w-44 h-10"
            priority
          />
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div
            className="relative text-left hidden md:inline-block"
            onClick={() => setIsOpenProfile(!isOpenProfile)}
          >
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 "
            >
              <FaRegUserCircle size={20} className="mr-2" />
              {user?.first_name + " " + user?.last_name}
            </button>

            {/* dropdown menu  */}
            {isOpenProfile && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                <Link href="/profile">
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </span>
                </Link>

                <div className="cursor-pointer" onClick={handleLogout}>
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpenDropdownMenu(!isOpenDropdownMenu)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          >
            <IoMdMenu size={60} />
          </button>
        </div>

        <div
          className={`${
            isOpenDropdownMenu ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <NavbarLink
              title="Play"
              link="/play"
              isActive={activeLink == "/play"}
            />
            <NavbarLink
              title="Rankings"
              link="/rankings"
              isActive={activeLink == "/rankings"}
            />
            <NavbarLink
              title="History"
              link="/history"
              isActive={activeLink == "/history"}
            />

            <div className="block md:hidden">
              <NavbarLink
                title="My Profile"
                link="/profile"
                isActive={activeLink == "/profile"}
              />
              <li
                className={`block py-2 px-3  rounded md:bg-transparent md:p-0 text-gray-900`}
              >
                Logout
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
