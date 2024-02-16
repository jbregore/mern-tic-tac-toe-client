import { Banner } from "@/images";
import Image from "next/image";
import React from "react";
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import Link from "next/link";

const LoginCard = () => {
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="mb-8 flex justify-center">
          <Image src={Banner} alt="Tic Tac Toe Banner" className="w-[90%]" />
        </div>

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
              Login to your account
            </h1>

            <form>
              <TextInput title="Username" type="text" />

              <TextInput title="Password" type="password" />

              <div className="w-full mt-6">
                <Button
                  title="Sign in"
                  style="text-white bg-blue-600 w-full"
                  type="submit"
                />
              </div>
            </form>

            <p className="text-sm font-light text-gray-500 text-center">
              Don&apos;t have an account yet?{" "}
              <Link href="/register">
                <span className="font-medium text-blue-600 hover:underline ">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginCard;
