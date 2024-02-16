import { Banner } from "@/images";
import Image from "next/image";
import React from "react";
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import Link from "next/link";

const RegisterCard = () => {
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="mb-8 flex justify-center">
          <Image src={Banner} alt="Tic Tac Toe Banner" className="w-[90%]" />
        </div>

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
              Sign up your account
            </h1>

            <form>
              <TextInput title="First Name" type="text" />

              <TextInput title="Last Name" type="text" />

              <TextInput title="Username" type="text" />

              <TextInput title="Password" type="password" />

              <TextInput title="Confirm Password" type="password" />

              <div className="w-full mt-6">
                <Button
                  title="Sign up"
                  style="text-white bg-blue-600 w-full"
                  type="submit"
                />
              </div>
            </form>

            <p className="text-sm font-light text-gray-500 text-center">
              Already have an account?{" "}
              <Link href="/">
                <span className="font-medium text-blue-600 hover:underline ">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterCard;
