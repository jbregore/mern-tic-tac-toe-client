"use client";
import { Banner } from "@/images";
import Image from "next/image";
import React, { useState } from "react";
import TextInput from "../inputs/TextInput";
import Button from "../buttons/Button";
import Link from "next/link";
import { AuthApi } from "@/api/AuthApi";
import useFormErrors from "@/hooks/useFormErrors";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginCard = () => {
  const router = useRouter();

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  const { signin } = AuthApi();
  const {
    formErrors,
    setFormErrors,
    handleFormErrors,
    errorHandler,
    mainError,
    setMainError,
  } = useFormErrors();

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonLoading(true);
    try {
      const result = await signin(payload);
      if (result.status == 200) {
        Cookies.set("token", JSON.stringify(result.data.token));
        router.push("/play");
      }
    } catch (err: any) {
      if (err.response.status === 422) {
        const errors = errorHandler(err);
        setFormErrors(errors);
        setMainError("");
      }
      if (err.response.status === 404) {
        const error404 = errorHandler(err);
        setFormErrors([]);
        setMainError(error404);
      }
    }
    setIsButtonLoading(false);
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="mb-8 flex justify-center">
          <Image
            src={Banner}
            alt="Tic Tac Toe Banner"
            className="w-[90%]"
            priority
          />
        </div>

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
              Login to your account
            </h1>

            <form onSubmit={handleSubmit}>
              <TextInput
                title="Username"
                type="text"
                name="username"
                onChange={handleChange}
                value={payload.username}
                error={formErrors.errors ? handleFormErrors("username") : ""}
              />

              <TextInput
                title="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={payload.password}
                error={formErrors.errors ? handleFormErrors("password") : ""}
              />

              <div className="w-full mt-6">
                <Button
                  isLoading={isButtonLoading}
                  title="Sign in"
                  style="text-white bg-blue-600 w-full"
                  type="submit"
                />
              </div>

              {mainError && (
                <p className="text-center text-red-500 text-sm mt-2">
                  {mainError}
                </p>
              )}
            </form>

            <p className="text-sm font-light text-gray-500 text-center">
              Don&apos;t have an account yet?{" "}
              <Link href="/sign-up">
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
